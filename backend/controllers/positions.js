const userStore = require('../models/userStore')
const consumer = require('../models/user')

exports.saveChangePosition = (req, res)=>{
  try{
    const {type, _id, longitude, latitude } = req.body
    const model = type ? userStore : consumer
    model.findByIdAndUpdate({_id : _id }, {
      location : {
        coordinates : [longitude, latitude]
      }
    }, (err, doc)=>{
      if(err)
        console.log("err ", err)
      else
        console.log("docs ", doc)
    })
    res.status(201).json("save change positions")
  }
  catch(e){

  }
}