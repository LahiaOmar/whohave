const bcrypt = require('bcrypt')
const userStore = require('../models/userStore')
const userWho = require("../models/user")
const jwt = require("jsonwebtoken")

exports.storeSignUp = (req, res)=>{
  const {password, ...restOfFiled} = req.body
  bcrypt.hash(password, 10)
    .then(hash=>{
      const currentUserStore = new userStore({
        ...restOfFiled,
        password : hash
      })
      currentUserStore.save()
        .then(()=> res.status(201).json({message : "object Created",type : true, information : currentUserStore.getFieldToSend()}))
        .catch((err)=> res.status(400).json({err}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.userSignUp = (req, res) =>{
  const {password, ...restOfFiled} = req.body
  bcrypt.hash(password, 10)
    .then(hash=>{
      const currentUser = new userWho({
        ...restOfFiled,
        password : hash
      })
      currentUser.save()
        .then(()=>res.status(201).json({message : "user created !",type : false, information : currentUser.getFieldToSend()}))
        .catch(err=> res.status(400).json({err}))
    })
    .catch(err=>res.status(500).json({err}))
}

exports.userLogin = async function (req, res){
  const model = (req.body.checkStore) ? userStore : userWho
  try{
    let curUser = await model.findOne({email : req.body.email})
    if(!curUser){
      const errObject = {status : 401, message : "userNotFound"} 
      throw new Error(JSON.stringify(errObject))
    }
    let match = await bcrypt.compare(req.body.password, curUser.password)
    if(!match){
      const errObject = {status : 401, message : "userNotFound"}
      throw new Error(JSON.stringify(errObject))
    }
    const token = jwt.sign({userId : curUser._id}, "RANDOM_SECRECT_KEY", {expiresIn : '24h'})
    const dataToSend = curUser.getFieldToSend()
    res.status(200).json({
      token : token,
      type : req.body.checkStore ? true : false,
      information : dataToSend
    })
  }
  catch(e){
    console.log("err ", e)
    const message = JSON.parse(e.message)
    if(typeof message === "object")
      res.status(message.status).json({message : message.message})
    else
      res.status(500).json({message : "server error"})
  }
}
