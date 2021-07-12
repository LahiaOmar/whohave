const NotificationsModel = require('../models/notification')
const ProductModel = require('../models/products')
const StoreModel = require("../models/userStore")
const ObjectID = require("mongoose").mongo.ObjectID
const { OK, UNAUTHORIZED } = require('http-status')

exports.user = async (req, res) => {
  try {
    const { userId } = res.locals

    let products = await ProductModel.find({ from: userId })
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
    res.status(OK).json({ stores, products })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.store = async (req, res) => {
  try {
    const { userId } = res.locals
    const notifications = await NotificationsModel.find({
      to: {
        $in: [userId]
      },
      type: 'request'
    })
    let products = notifications.map(async ({ content }) => {
      return await ProductModel.findOne({ _id: content })
    })
    products = await Promise.all(products)
    res.status(OK).json({ products })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.storeResponse = async (req, res) => {
  try {
    const { queryData, content } = req.body
    const { userId, storeId } = queryData
    const { productId } = content

    const product = await ProductModel.findOne({ _id: productId })
    if (product) {
      const notification = new NotificationsModel({
        type: 'response',
        content,
        from: storeId,
        to: [userId]
      })
      await notification.save()
      await NotificationsModel.findOneAndUpdate({
        content: new ObjectID(content.productId),
        type: 'request'
      }, {
        $pull: {
          to: storeId
        }
      })
      res.status(OK).json("feedback")
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
      res.status(OK).json("feedback")
    }
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.delete = async (req, res) => {
  try {
    const { productId, storeId } = req.params
    await NotificationsModel.deleteOne({
      type: 'response',
      'content.productId': productId,
      from: storeId
    })
    res.status(OK).json({ message: "deleted" })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}