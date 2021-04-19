const NotificationsModel = require('../models/notification')
const ProductModel = require('../models/products')
const StoreModel = require("../models/userStore")
const ObjectID = require("mongoose").mongo.ObjectID
const httpCode = require('http-status')

exports.user = async (req, res) => {
  try {
    const { userType, userId } = res.locals
    console.log("user id ", userId)
    let products = await ProductModel.find({ from: userId })
    // for every product, find all reponse
    let productsResponses = products.map(async product => {
      return await NotificationsModel.find({
        'content.productId': product._id.toString(),
        'content.ok': 1,
        type: 'response',
      }, {
        to: 0
      })
    })
    productsResponses = await Promise.all(productsResponses)

    let stores = productsResponses.map(async productResponses => {
      let currentResponses = productResponses.map(async response => {
        return await StoreModel.findOne(
          { _id: new ObjectID(response.from) },
          { name: 1, address: 1, location: 1 })
      })
      currentResponses = await Promise.all(currentResponses)
      return currentResponses
    })
    stores = await Promise.all(stores)
    console.log("all stores ", stores)
    console.log("user products ", products)
    res.status(httpCode.OK).json({ stores, products })
  }
  catch (e) {
    console.log("err ", e)
    res.status(httpCode.INTERNAL_SERVER_ERROR).json({ err: e })
  }
}

exports.store = async (req, res) => {
  try {
    const { userId } = res.locals
    // product sent from user to storeUser. => content of notification is unique
    const notifications = await NotificationsModel.find({
      to: {
        $in: [userId]
      },
      type: 'request'
    })
    console.log("notification sotre", notifications)
    let products = notifications.map(async ({ content }) => {
      return await ProductModel.findOne({ _id: content })
    })
    products = await Promise.all(products)
    console.log("product ", products)
    res.status(httpCode.OK).json({ products })
  }
  catch (e) {
    console.log("err ", e)
    res.status(httpCode.INTERNAL_SERVER_ERROR).json({ err: e })
  }
}

exports.storeResponse = async (req, res) => {
  try {
    const { queryData, content } = req.body
    const { userId, storeId } = queryData
    const { productId } = content
    const product = await ProductModel.findOne({ _id: productId })
    console.log("product  store response ", product)
    if (product) {
      const notification = new NotificationsModel({
        type: 'response',
        content,
        from: storeId,
        to: [userId]
      })
      await notification.save()
      console.log("notification store ", notification)
      await NotificationsModel.findOneAndUpdate({
        content: new ObjectID(content.productId),
        type: 'request'
      }, {
        $pull: {
          to: storeId
        }
      })
      res.status(200).json("feedback")
    }
    else {
      await NotificationsModel.findOneAndUpdate({
        content: new ObjectID(content.productId),
        type: 'request'
      }, {
        $pull: {
          to: storeId
        }
      })
      res.status(200).json("feedback")
    }
  }
  catch (ex) {
    console.log("ex feedback", ex)
    res.status(400).json({ err: ex })
  }
  res.status(200)
}

exports.delete = async (req, res) => {
  try {
    const { productId, storeId } = req.body
    await NotificationsModel.deleteOne({
      type: 'response',
      'content.productId': productId,
      from: storeId
    })
    res.status(httpCode.OK).json("deleted")
  }
  catch (ex) {
    res.status(httpCode.INTERNAL_SERVER_ERROR).json({ error: ex })
  }
}