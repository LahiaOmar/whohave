const socket = require("socket.io")
const socketMap = require('../models/socketMap')
const ProductsModel = require('../models/products')
const ObjectID = require("mongoose").mongo.ObjectID
const StoresModel = require('../models/userStore')
const logger = require('../logger')
class SocketService {

  constructor(httpServer) {
    this.io = socket(httpServer, { origins: '*:*' })
  }

  connect() {
    this.io.on('connection', this.socketConnection)
  }

  async socketConnection(socket) {
    try {
      const { userId } = socket.handshake.query
      const isExist = await socketMap.findOne({ userId: userId })
      if (isExist) {
        await socketMap.findByIdAndUpdate({ _id: isExist._id }, { socketId: socket.id })
      }
      else {
        const mp = new socketMap({ userId, socketId: socket.id })
        await mp.save()
      }
      socket.on('disconnect', async () => {
        await socketMap.deleteOne({ socketId: socket.id })
      })
    }
    catch (ex) {
      logger.error(`socketConnection exeption : ${ex.message}`)
    }
  }

  async sendNotification(dataChange) {
    try {
      if (dataChange.operationType === 'insert') {
        const notification = dataChange.fullDocument
        if (notification.type === 'response') {
          const { from, content: { productId }, to } = notification
          const userSocketId = await socketMap.findOne({ userId: to[0] })
          if (userSocketId.socketId) {
            const store = await StoresModel.findOne({ _id: new ObjectID(from) }, { name: 1, address: 1, location: 1 })
            this.io.to(userSocketId.socketId).emit('notification', JSON.stringify({ store, productId }))
          }
        }
        else {
          const { from, content: productId, to } = notification
          const product = await ProductsModel.findOne({ _id: productId })
          let storesSocketsIds = await socketMap.find({
            userId: {
              $in: to
            }
          })
          storesSocketsIds = await Promise.all(storesSocketsIds)
          storesSocketsIds.forEach(({ socketId }) => {
            this.io.to(socketId).emit('notification', JSON.stringify(product))
          })
        }
      }
    }
    catch (ex) {
      logger.error(`send notification exception ${ex.message}`)
    }
  }
}

module.exports = SocketService