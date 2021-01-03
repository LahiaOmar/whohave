const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userStore = require("../models/userStore")
const user = require("../models/user")
module.exports = async (req, res, next) => {
  const { cookies } = req
  const { userType } = req.body
  console.log("auth.js : usertype ", userType, cookies)
  try {
    console.log("decodeding token ...")
    const decodeToken = await jwt.verify(cookies.token, "RANDOM_SECRECT_KEY")
    console.log("decoded token ", decodeToken)
    const model = userType ? userStore : user
    console.log("model ", model)
    const user = await model.findById({ _id: decodeToken.userId })
    console.log("user next", user)
    if (user) {
      res.locals.userId = decodeToken.userId
      res.locals.userType = userType
      next()
    }
    else {
      res.status(401).json({ valideToken: false })
    }
  }
  catch (e) {
    res.status(401).json({ valideToken: false })
  }
}