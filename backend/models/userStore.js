const mongoose = require("mongoose")

const userStoreSchema = mongoose.Schema({
  firstName : {type : String, require : true},
  lastName : {type : String, require : true},
  password : {type : String, require : true},
  email : {type : String, require : true},
  address : {type : String, require : true},
  storeTypes: [{type : String, require : true}],
  coordinates : [Number]
})

userStoreSchema.methods.getFieldToSend = function(){
  return {
    _id : this._id,
    firstName : this.firstName,
    lastName : this.lastName,
    coordinates : this.coordinates
  }
}

module.exports = mongoose.model('userStore', userStoreSchema)