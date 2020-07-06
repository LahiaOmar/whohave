const mongoose = require("mongoose")

const userStoreSchema = mongoose.Schema({
  firstName : {type : String, require : true},
  lastName : {type : String, require : true},
  password : {type : String, require : true},
  email : {type : String, require : true},
  address : {type : String, require : true},
  storeTypes: [{type : String, require : true}],
  storePosition : [Number]
})

module.exports = mongoose.model('userStore', userStoreSchema)