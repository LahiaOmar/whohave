const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userStore = require("../models/userStore")
const userConsumer = require("../models/user")

module.exports = async (req, res, next) => {
  const { cookies } = req
  console.log("coookie", cookies.token)
  try {
    const decodeToken = await jwt.verify(cookies.token, "RANDOM_SECRECT_KEY")
    const { userId, userType } = decodeToken
    console.log("not ", !userId, !userType, !userId && !userType)
    res.locals.userId = userId
    res.locals.userType = userType
    console.log("next call")
    next()
  }
  catch (e) {
    console.log("e : ", e)
    res.status(401).json({ valideToken: false })
  }
}