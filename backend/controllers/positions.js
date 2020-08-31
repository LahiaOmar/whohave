const userStore = require('../models/userStore')
const consumer = require('../models/user')

exports.saveChangePosition = async (req, res)=>{
  try{
    const {type, _id, longitude, latitude, ...rest } = req.body
    const model = type ? userStore : consumer
    let doc = await model.findByIdAndUpdate({_id : _id }, {
      location : {
        coordinates : [longitude, latitude]
      },
      ...rest
    })
    res.status(201).json("save change positions")
  }
  catch(e){
    res.status(400).json({err : e})
  }
}