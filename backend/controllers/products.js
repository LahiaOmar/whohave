const userStore = require("../models/userStore")
const notification = require('../models/notification')
const user = require("../models/user")
const { boradCast } = require('../notification/connections')
const socketMap = require("../models/socketMap")
const httpStatus = require("http-status")

function consumerHandler(body, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { corrdinates, distance, storeTypes, productName, images, description } = body
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
      const updateRequests = allStores.map(async (store) => {
        return await userStore.findByIdAndUpdate({ _id: store._id }, {
          $push:
          {
            notifications: productObject
          }
        })
      })

      await Promise.all(updateRequests)
      const findSocketIds = allStores.map(async (store) => {
        return await socketMap.findOne({ userId: store._id })
      })
      const socketWithIds = await Promise.all(findSocketIds)
      const socketIds = socketWithIds.map(mp => mp.socketId)
      resolve([socketIds, productObject])
    }
    catch (e) {
      reject(e)
    }

  })
}

function storeOwnerHandler(body) {
  return new Promise(async (resolve, reject) => {
    const { from, to, productId, productName } = body
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
      const mpSocket = await socketMap.findOne({ userId: consumer._id })
      socketId = mpSocket.socketId
      resolve([[socketId], fromStore])
    }
    catch (e) {
      reject(e)
    }
  })
}

exports.broadCastProduct = async function (req, res) {
  try {
    const { userType, userId } = res.locals
    const [socketsIds, data] = userType
      ? await storeOwnerHandler(req.body)
      : await consumerHandler(req.body, userId)
    socketsIds.forEach(socketId => {
      if (socketId) {
        req.io.to(socketId).emit("newNotification", JSON.stringify(data))
      }
    });
    res.status(httpStatus.CREATED).json({ msg: "broadCasted!" })
  }
  catch (err) {
    console.log("err ", err)
    res.status(400).json({ err: err })
  }
}