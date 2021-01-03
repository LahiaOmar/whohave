const mongoose = require("mongoose")
const location = require("../models/location.js")
const notification = require('../models/notification')

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  first: { type: Boolean, default: false },
  socketId: { type: String, default: "" },
  notifications: [notification],
  location: { type: location, default: {} }
})

userSchema.methods.getFieldToSend = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    first: this.first,
    coordinates: this.location.coordinates,
  }
}

module.exports = mongoose.model('user', userSchema)