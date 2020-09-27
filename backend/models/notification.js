const mongoose = require('mongoose')

const notification = new mongoose.Schema({
  from : {
    type : String
  },
  informations : {
    type: Object,
    required : true
  },
  images : {
    type : []
  }
})

module.exports =  notification