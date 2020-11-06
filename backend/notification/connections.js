const axios = require('axios')

async function socketDisconnected(socket) {
  try {
    const saveIds = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/user/updateUser',
      data: {
        userId: socket.info.userId,
        type: socket.info.type,
        forUpdate: {
          socketId: null
        }
      }
    })
  }
  catch (err) {
    console.log("disconnected socket err ", err)
  }
}

exports.socketConnected = async function (socket) {
  let { userId, type } = socket.handshake.query
  const socketId = socket.id
  type = type === 'true' ? true : false
  socket.info = {
    userId,
    type
  }
  try {
    const saveIds = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/user/updateUser',
      data: {
        userId: userId,
        type: type,
        forUpdate: {
          socketId: socketId
        }
      }
    })
    socket.on('disconnect', socketDisconnected.bind(this, socket))
  } catch (err) {
    console.log("connection sockets err ", err)
  }
}


exports.boradCast = (io, sockestIdArr, data) => {
  sockestIdArr.forEach(socketId => io.to(socketId).emit("newNotification", JSON.stringify(data)))
}