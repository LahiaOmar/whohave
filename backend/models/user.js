const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  firstName : {type : String, require : true},
  lastName : {type : String, require : true},
  password : {type : String, require : true},
  email : {type : String, require : true},
  positionMap : [String]
})

module.exports = mongoose.model('user', userSchema)