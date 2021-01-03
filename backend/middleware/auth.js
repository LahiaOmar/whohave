const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userStore = require("../models/userStore")
const userConsumer = require("../models/user")

module.exports = async (req, res, next) => {
  const { cookies } = req
  const { userType } = req.body
  try {
    const decodeToken = await jwt.verify(cookies.token, "RANDOM_SECRECT_KEY")
    const model = userType ? userStore : userConsumer
    const user = await model.findById({ _id: decodeToken.userId })
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
    console.log("e : ", e)
    res.status(401).json({ valideToken: false })
  }
}