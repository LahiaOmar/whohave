const userStore = require("../models/userStore")

exports.broadCastProduct = (req, res)=>{
  console.log("req body ", req.body)
  
  res.status(200).json("he")
}
