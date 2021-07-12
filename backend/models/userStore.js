const mongoose = require("mongoose")
const location = require("../models/location.js")

const userStoreSchema = new mongoose.Schema({
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
    required: [true, 'password is required !'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w +)*(\.\w{2,3})+$/, `email : format error`]
  },
  name: {
    type: String,
    required: [true, 'name is required !'],
    min: 3,
    max: 20
  },
  address: {
    type: String,
    required: [true, 'address is required !'],
    min: 3,
    max: 50
  },
  types: [{
    type: String,
    required: [true, 'types is required !'],
    min: 1
  }],
  country: {
    type: String,
    required: [true, 'country is required !'],
    min: 2,
    max: 20
  },
  city: {
    type: String,
    required: [true, 'city is required !'],
    min: 2,
    max: 20
  },
  unicodeFlag: { type: String },
  location: { type: location, default: {}, index: "2dsphere", required: true }
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