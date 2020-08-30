const mongoos = require("mongoose")

const locationSchema = new mongoos.Schema({
  type : {
    type : String,
    default : "Point"
  },
  coordinates : {
    type : [Number],
    default : [-1,-1],
    index : '2dsphere'
  }
})

module.exports = locationSchema