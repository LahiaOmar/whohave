const userStore = require("../models/userStore")
const NotificationsModel = require('../models/notification')
const user = require("../models/user")
const socketMap = require("../models/socketMap")
const httpStatus = require("http-status")
const ProductsModel = require("../models/products")
const ObjectID = require('mongoose').mongo.ObjectID

exports.delete = async (req, res) => {
  try {
    const { productId } = req.body
    const productDeleted = await ProductsModel.findByIdAndDelete({ _id: productId })
    console.log("product deleted ", productDeleted)
    await NotificationsModel.deleteMany({
      $or: [
        { 'content.productId': productId },
        { content: new ObjectID(productId) }
      ]
    })
    res.status(httpStatus.OK).json("ok")
  }
  catch (ex) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: ex })
  }
}

exports.storeFeedback = async (req, res) => {
  try {
    const { userId } = res.locals
    const { queryData, content } = req.body
    const { storeId } = queryData

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
    res.status(httpStatus.CREATED).json({ msg: "send!" })
  }
  catch (ex) {
    console.log("err ", err)
    res.status(400).json({ err: err })
  }
}

exports.send = async (req, res) => {
  try {
    const { userId } = res.locals
    const { name, description, from } = req.body
    const { types, city, country } = req.body
    const images = req.files.map(file => file.buffer.toString('base64'))
    console.log("send product images ", images)
    // image => (through a File interface / blob ) Buffer => Image
    const product = { name, description, from, images }
    const storesTypes = types.split(',')

    const storeDocument = new ProductsModel(product)
    await storeDocument.save()

    const allStores = await userStore.find({
      types: {
        $in: storesTypes
      },
      country,
      city
    }, {
      _id: 1
    })
    if (allStores.length === 0)
      res.status(200).json("send")

    const storesIds = allStores.map(objId => objId._id)

    const notification = new NotificationsModel({
      content: storeDocument._id, from: userId, to: storesIds, type: 'request'
    })
    await notification.save()
    res.status(200).json("send")
  }
  catch (ex) {
    res.status(400).json({ err: ex })
    console.log("send ex", ex)
  }
}