const mongoose = require("mongoose")
const location = require("../models/location.js")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required !'],
    min: 3,
    max: 20
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required !'],
    min: 3,
    max: 20
  },
  password: {
    type: String,
    required: [true, 'password is required !'],
    minlength: 5
  },
  email: {
    type: String,
    required: [true, 'email is required !'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w +)*(\.\w{2,3})+$/, `email : format error`]
  },
  socketId: { type: String, default: "" },
})

userSchema.methods.getFieldToSend = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    coordinates: this.location,
  }
}

module.exports = mongoose.model('UserModel', userSchema)