const axios = require('axios')

async function socketDisconnected(socket) {
  try {
    const saveIds = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/user/socketMap',
      data: {
        userId: socket.info.userId,
        socketId: null
      }
    })
  }
  catch (err) {
    console.log("disconnected socket err ", err)
  }
}

exports.socketConnected = async function (socket) {
  let { userId, userType } = socket.handshake.query
  const socketId = socket.id
  socket.info = {
    userId,
    userType
  }
  try {
    const saveIds = await axios({
      method: 'POST',
      url: 'http://localhost:4000/api/user/socketMap',
      data: {
        userId: userId,
        socketId, socketId
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