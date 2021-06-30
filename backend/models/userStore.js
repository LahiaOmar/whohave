const mongoose = require("mongoose")
const location = require("../models/location.js")

const userStoreSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  types: [{ type: String, required: true }],
  country: { type: String, required: true },
  city: { type: String, required: true },
  unicodeFlag: { type: String },
  location: { type: location, default: {}, index: "2dsphere" }
})


userStoreSchema.methods.getFieldToSend = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    address: this.address,
    storeTypes: this.types,
    storeName: this.name,
    city: this.city,
    country: this.country,
    unicodeFlag: this.unicodeFlag,
    location: {
      coordinates: this.location.coordinates
    },
  }
}

module.exports = mongoose.model('StoreModel', userStoreSchema)