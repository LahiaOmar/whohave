const socket = require("socket.io")
const socketMap = require('../models/socketMap')
const ProductsModel = require('../models/products')
const ObjectID = require("mongoose").mongo.ObjectID
const StoresModel = require('../models/userStore')

class SocketService {

  constructor(httpServer) {
    this.io = socket(httpServer, { origins: '*:*' })
  }

  connect() {
    this.io.on('connection', this.socketConnection)
  }

  async socketConnection(socket) {
    try {
      let { userId } = socket.handshake.query
      console.log("user is connected", userId)
      const isExist = await socketMap.findOne({ userId: userId })
      if (isExist) {
        await socketMap.findByIdAndUpdate({ _id: isExist._id }, { socketId: socket.id })
      }
      else {
        const mp = new socketMap({ userId, socketId: socket.id })
        await mp.save()
      }
      socket.on('disconnect', () => {
        socketMap.deleteOne({ socketId: socket.id })
          .catch(err => console.log("err delete socket id", err))
      })
    }
    catch (e) {
      console.log("save socket err", e)
    }
  }

  async sendNotification(dataChange) {
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
}

module.exports = SocketService