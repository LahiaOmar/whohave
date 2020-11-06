const userStore = require("../models/userStore")
const notification = require('../models/notification')
const user = require("../models/user")
const { boradCast } = require('../notification/connections')

async function consumerHandler(body) {
  // send notification from consumer to store.
  const { corrdinates, distance, storeTypes, userId, productName, images, description } = body
  const allStores = await userStore.find({
    location: {
      $near: {
        $maxDistance: distance,
        $geometry: {
          type: "Point",
          coordinates: [corrdinates[0], corrdinates[1]]
        }
      }
    },
    storeTypes: {
      $in: storeTypes
    }
  })
  const productObject = {
    from: userId,
    informations: {
      productName,
      description
    },
    images
  }
  const updateRequests = allStores.map(async function (store) {
    await userStore.findByIdAndUpdate({ _id: store._id }, {
      $push:
      {
        notifications: productObject
      }
    })
  })

  await Promise.resolve(updateRequests)
  const storesWithSockets = allStores.filter(store => store.socketId)
  const socketsIdArr = storesWithSockets.map(store => store.socketId)
  return [socketsIdArr, productObject]
}

async function storeOwnerHandler(body) {
  // send notif from store owner to consumers.
  const { from, to, productId, productName } = body
  console.log("req information ", from, to)
  let socketId = ''
  let fromStore = {}
  try {
    const store = await userStore.findByIdAndUpdate({ _id: from }, {
      $pull: {
        notifications: {
          _id: productId
        }
      }
    })
    const [longitude, latitude] = store.location.coordinates
    console.log("lng lat", [longitude, latitude])
    fromStore = {
      informations: {
        productName,
        address: store.address,
        storeName: store.storeName,
        location: { longitude, latitude }
      }
    }
    const consumer = await user.findByIdAndUpdate({ _id: to }, {
      $push: {
        notifications: fromStore
      }
    })

    socketId = consumer.socketId
    console.log("find and update object ", store)
    return [[socketId], fromStore]
  }
  catch (e) {
    console.log("err type store ", e)
  }
}

exports.broadCastProduct = async function (req, res) {
  try {
    const { type } = req.body
    const [socketsIds, data] = (type) ? await storeOwnerHandler(req.body) : await consumerHandler(req.body)
    console.log("broad cast msg : sockets and data ", [socketsIds, data])
    socketsIds.forEach(socketId => {
      if (socketId) {
        req.io.to(socketId).emit("newNotification", JSON.stringify(data))
      }
    });
    res.status(200).json("broadcasted !!")
  }
  catch (err) {
    console.log("err ", err)
    res.status(400).json({ err: err })
  }
}