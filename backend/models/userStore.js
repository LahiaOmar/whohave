const mongoose = require("mongoose")
const location = require("../models/location.js")
const notification = require('../models/notification')

const userStoreSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  storeName: { type: String, required: true },
  address: { type: String, require: true },
  storeTypes: [{ type: String, require: true }],
  first: { type: Boolean, default: false },
  socketId: { type: String, default: "" },
  notifications: [notification],
  location: { type: location, default: {}, index: "2dsphere" }
})


userStoreSchema.methods.getFieldToSend = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    first: this.first,
    email: this.email,
    address: this.address,
    storeTypes: this.storeTypes,
    storeName: this.storeName,
    coordinates: this.location.coordinates,
  }
}

module.exports = mongoose.model('userStore', userStoreSchema)