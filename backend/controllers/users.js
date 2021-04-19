const bcrypt = require('bcrypt')
const userStore = require('../models/userStore')
const userWho = require("../models/user")
const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")
const socketMap = require('../models/socketMap')

exports.userSignUp = async (req, res) => {
  const { userData, userType } = req.body
  const { password, ...restOfFiled } = userData
  try {
    const hash = await bcrypt.hash(password, 10)
    const user = userType === 'STORE'
      ? new userStore({ ...restOfFiled, password: hash })
      : new userWho({ ...restOfFiled, password: hash })
    await user.save()
    const token = jwt.sign({
      userId: user._id,
      userType
    }, "RANDOM_SECRECT_KEY", { expiresIn: '24h' })
    res.cookie('token', token, { httpOnly: true })
    res.status(httpStatus.CREATED).json({ message: "object Created", userType, information: user.getFieldToSend() })
  }
  catch (ex) {
    res.status(500).json({ ex })
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { userType } = req.body
    console.log("userType ", userType)
    const model = (userType === 'STORE') ? userStore : userWho
    let user = await model.findOne({ email: req.body.email })
    if (!user) {
      console.log("no user found")
      const errObject = { status: 401, message: "userNotFound" }
      throw new Error(JSON.stringify(errObject))
    }
    let match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      console.log("match")
      const errObject = { status: 401, message: "userNotFound" }
      throw new Error(JSON.stringify(errObject))
    }
    const token = jwt.sign({ userId: user._id, userType }, "RANDOM_SECRECT_KEY", { expiresIn: '24h' })
    res.cookie('token', token, { httpOnly: true })
    const dataToSend = user.getFieldToSend()
    res.status(200).json({
      userType,
      information: dataToSend
    })
  }
  catch (e) {
    console.log("err ", e)
    const message = JSON.parse(e.message)
    if (typeof message === "object")
      res.status(message.status).json({ message: message.message })
    else
      res.status(500).json({ message: "server error" })
  }
}

exports.userLogout = (req, res) => {
  res.clearCookie('token')
  res.status(httpStatus.OK).json("token removed")
}

exports.setPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const { userId, userType } = res.locals
    console.log("userId, userType", userId, userType, oldPassword, newPassword)
    const model = userType === 'STORE' ? userStore : userWho
    const user = await model.findById({ _id: userId })
    if (user) {
      const match = await bcrypt.compare(oldPassword, user.password)
      console.log("user match", user, match)
      if (match) {
        console.log("is matching")
        const hashPassword = await bcrypt.hash(newPassword, 10)
        const userUpdated = await model.findByIdAndUpdate({ _id: userId }, { password: hashPassword }, { new: true })
        res.status(201).json({
          userData: userUpdated.getFieldToSend(),
          userType
        })
      }
      else {
        console.log("not mathing")
        res.status(401).json("wrong password")
      }
    }
    else {
      res.status(401).json("wrong credentials / user not found")
    }
  }
  catch (e) {
    res.status(401).json("wrong credentials")
  }
}

exports.userSetInformation = async function (req, res) {
  try {
    const { forUpdate } = req.body
    const { userId, userType } = res.locals
    const userModel = userType === 'STORE' ? userStore : userWho
    const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, {
      ...forUpdate
    }, { new: true })
    console.log("updated data model", updatedUser)
    res.status(200).json({ msg: "updated !", userData: updatedUser.getFieldToSend(), userType, })
  }
  catch (e) {
    console.log("e", e)
    res.status(500).json({ msg: e })
  }
}

exports.verify = async (req, res) => {
  const { userType, userId } = res.locals
  try {
    const model = userType === 'STORE' ? userStore : userWho
    const user = await model.findById({ _id: userId })
    if (user) {
      res.status(201).json({ userType: userType, userData: user.getFieldToSend() })
    }
    else {
      res.status(401).json({ msg: "user not found" })
    }
  }
  catch (e) {
    res.status(401).json({ err: e })
  }
}

exports.getInformation = async (req, res) => {
  console.log("get informatios ", res.locals)
  const { userType, userId } = res.locals
  try {
    const model = userType ? userStore : userWho
    const user = await model.findById({ _id: userId })
    if (user) {
      res.status(201).json({ userData: user.getFieldToSend() })
    }
    else {
      res.status(401).json({ e: "error" })
    }
  }
  catch (e) {
    res.status(401).json({ e: "error" })
  }
}

exports.socketMap = async (req, res) => {
  const { userId, socketId } = req.body
  try {
    const existId = await socketMap.findOne({ userId: userId })
    if (existId) {
      console.log("exit user id")
      await socketMap.findByIdAndUpdate({ _id: existId._id }, { socketId: socketId })
    }
    else {
      console.log("not exit")
      const mapping = new socketMap({ userId, socketId })
      await mapping.save()
    }
    res.status(httpStatus.CREATED).json("created!")
  }
  catch (e) {
    res.status(401).json("mapping sockets erros")
  }
}