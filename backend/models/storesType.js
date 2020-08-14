const mongoose = require("mongoose")

const storesType = mongoose.Schema({
  specialty : {
      type : String,
      require : true,
    }
})

module.exports = mongoose.model('storesTypes', storesType)