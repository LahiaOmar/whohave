const mongoose = require("mongoose")

const socketMapSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('socketMapSchema', socketMapSchema)