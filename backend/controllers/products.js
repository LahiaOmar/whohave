const ObjectID = require('mongoose').mongo.ObjectID
const path = require('path')
const { OK, UNAUTHORIZED } = require("http-status")

const userStore = require("../models/userStore")
const NotificationsModel = require('../models/notification')
const ProductsModel = require("../models/products")

exports.delete = async (req, res) => {
  try {
    const { productId } = req.params
    await ProductsModel.findByIdAndDelete({ _id: productId })
    await NotificationsModel.deleteMany({
      $or: [
        { 'content.productId': productId },
        { content: new ObjectID(productId) }
      ]
    })
    res.status(OK).json({ message: "is deleted" })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
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
    await NotificationsModel.findOneAndUpdate({
      content: new ObjectID(content.productId),
      type: 'request'
    }, {
      $pull: {
        to: storeId
      }
    })
    res.status(CREATED).json({ message: "send!" })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.send = async (req, res) => {
  try {
    const { userId } = res.locals
    const { name, description, from } = req.body
    const { types, city, country } = req.body
    const images = req.files.map(file => file.filename)
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
    if (allStores.length) {
      const storesIds = allStores.map(objId => objId._id)

      const notification = new NotificationsModel({
        content: storeDocument._id, from: userId, to: storesIds, type: 'request'
      })
      await notification.save()
    }

    res.status(OK).json({ message: 'The product is send!' })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.sendImage = (req, res) => {
  const { imageId } = req.params
  res.sendFile(path.join(__dirname, '..', 'uploadImages', imageId), {
    Headers: {
      'content-type': 'image/png'
    }
  })
}