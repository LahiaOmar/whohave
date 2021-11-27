const mongoose = require("mongoose")

const storesType = new mongoose.Schema({
  specialty: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('Types', storesType)