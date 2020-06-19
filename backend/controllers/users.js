const bcrypt = require('bcrypt')
const userStore = require('../models/userStore')
const UserWho = require("../models/user")

exports.storeSignUp = (req, res, next)=>{
  const {password, ...restOfFiled} = req.body
  bcrypt.hash(password, 10)
    .then(hash=>{
      const currentUserStore = new userStore({
        ...restOfFiled,
        password : hash
      })
      currentUserStore.save()
        .then(()=> res.status(201).json({message : "object Created"}))
        .catch((err)=> res.status(400).json({err}))
    })
    .catch(error => res.status(500).json({error}))
}

exports.userSignUp = (req, res, next) =>{
  const {password, ...restOfFiled} = req.body
  bcrypt.hash(password, 10)
    .then(hash=>{
      const currentUser = new UserWho({
        ...restOfFiled,
        password : hash
      })
      currentUser.save()
        .then(()=>res.status(201).json({message : "user created !"}))
        .catch(err=> res.status(400).json({err}))
    })
    .catch(err=>res.status(500).json({err}))
}