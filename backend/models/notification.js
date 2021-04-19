const mongoose = require('mongoose')

const notificationsSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: [String],
    required: true
  },
  content: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('notifications', notificationsSchema)