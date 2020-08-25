const mongoose = require("mongoose")
const location = require("../models/location.js")

const userSchema = new mongoose.Schema({
  firstName : {type : String, require : true},
  lastName : {type : String, require : true},
  password : {type : String, require : true},
  email : {type : String, require : true},
  location : {type : location, default : {}}
})

userSchema.methods.getFieldToSend = function(){
  return {
    _id : this._id,
    firstName : this.firstName,
    lastName : this.lastName,
    coordinates : this.location.coordinates
  }
}

module.exports = mongoose.model('user', userSchema)