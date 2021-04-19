const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: {
    type: [Object]
  },
  from: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('products', productSchema)