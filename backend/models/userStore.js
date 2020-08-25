const mongoose = require("mongoose")
const location = require("../models/location.js")
const { get } = require("../models/location.js")

const userStoreSchema = new mongoose.Schema({
  firstName : {type : String, require : true},
  lastName : {type : String, require : true},
  password : {type : String, require : true},
  email : {type : String, require : true},
  address : {type : String, require : true},
  storeTypes: [{type : String, require : true}],
  location : {type : location, default : {}}
})

userStoreSchema.methods.getFieldToSend = function(){  
  return {
    _id : this._id,
    firstName : this.firstName,
    lastName : this.lastName,
    coordinates : this.location.coordinates
  }
}

module.exports = mongoose.model('userStore', userStoreSchema)