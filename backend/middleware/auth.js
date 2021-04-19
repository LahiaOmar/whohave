const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userStore = require("../models/userStore")
const userConsumer = require("../models/user")

module.exports = async (req, res, next) => {
  const { cookies } = req
  try {
    const decodeToken = await jwt.verify(cookies.token, "RANDOM_SECRECT_KEY")
    const { userId, userType } = decodeToken
    console.log("decoded token", decodeToken)
    res.locals.userId = userId
    res.locals.userType = userType
    next()
  }
  catch (e) {
    console.log("user token not valide #############################################################")
    res.status(401).json({ valideToken: false })
  }
}