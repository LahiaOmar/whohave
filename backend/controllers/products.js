const userStore = require("../models/userStore")
const notification = require('../models/notification')
const user = require("../models/user")

exports.broadCastProduct = async function(req, res, next){
  try{
    console.log("req.body", req.body)
    const {corrdinates , distance, storeTypes, userId, productName, images, description} = req.body
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
      storeTypes : {
        $in : storeTypes
      }
    })
    console.log("all stores ", allStores)
    const productObject = {
      from : userId,
      informations : {
        productName,
        description
      },
      images
    }
    for(let i = 0; i < allStores.length; i++){
      const add = await userStore.findByIdAndUpdate({_id : allStores[i]._id},{
        $push : 
          {notifications : productObject
        }
      })
      if(allStores[i].socketId){
        req.io.to(allStores[i].socketId).emit('newNotification', JSON.stringify(productObject))
      }
    }
    res.status(200).json("broadcasted !!")
  }
  catch(err){
    console.log("err ", err)
    res.status(400).json({err : err})
  }
}