const bcrypt = require('bcrypt')
const userStore = require('../models/userStore')
const userWho = require("../models/user")
const jwt = require("jsonwebtoken")
const httpStatus = require("http-status")

exports.storeSignUp = (req, res) => {
  const { password, ...restOfFiled } = req.body
  console.log(restOfFiled)
  bcrypt.hash(password, 10)
    .then(hash => {
      const currentUserStore = new userStore({
        ...restOfFiled,
        password: hash
      })
      currentUserStore.save()
        .then(() => res.status(httpStatus.CREATED).json({ message: "object Created", type: true, information: currentUserStore.getFieldToSend() }))
        .catch((err) => res.status(400).json({ err }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.userSignUp = (req, res) => {
  const { password, ...restOfFiled } = req.body
  bcrypt.hash(password, 10)
    .then(hash => {
      const currentUser = new userWho({
        ...restOfFiled,
        password: hash
      })
      currentUser.save()
        .then(() => res.status(201).json({ message: "user created !", type: false, information: currentUser.getFieldToSend() }))
        .catch(err => res.status(400).json({ err }))
    })
    .catch(err => res.status(500).json({ err }))
}

exports.userLogin = async function (req, res) {
  const model = (req.body.checkStore) ? userStore : userWho
  try {
    let curUser = await model.findOne({ email: req.body.email })
    if (!curUser) {
      console.log("no user found")
      const errObject = { status: 401, message: "userNotFound" }
      throw new Error(JSON.stringify(errObject))
    }
    let match = await bcrypt.compare(req.body.password, curUser.password)
    if (!match) {
      console.log("match")
      const errObject = { status: 401, message: "userNotFound" }
      throw new Error(JSON.stringify(errObject))
    }
    const token = jwt.sign({ userId: curUser._id, userType: req.body.checkStore }, "RANDOM_SECRECT_KEY", { expiresIn: '24h' })
    res.cookie('token', token, { httpOnly: true })
    const dataToSend = curUser.getFieldToSend()
    res.status(200).json({
      token: token,
      type: req.body.checkStore ? true : false,
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
  const { oldPassword, newPassword, userType } = req.body
  const { token } = req.cookies
  try {
    const decodedToken = jwt.verify(token, "RANDOM_SECRECT_KEY")
    console.log("decodedToken", decodedToken)
    const model = userType ? userStore : userWho
    const user = await model.findById({ _id: decodedToken.userId })
    if (user) {
      const match = await bcrypt.compare(oldPassword, user.password)
      if (!match) {
        res.status(401).json("wrong password")
      }
      else {
        const hashPassword = await bcrypt.hash(newPassword, 10)
        await model.findByIdAndUpdate({ _id: decodedToken.userId }, { password: hashPassword })
        res.status(201).json("password updated")
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
  console.log("update user req.body ", req.body)
  const { forUpdate } = req.body
  const { userId, userType } = res.locals
  console.log("userid , userType", userId, userType)
  const model = userType ? userStore : userWho
  console.log("model ", model)
  try {
    const update = await model.findByIdAndUpdate({ _id: userId }, {
      ...forUpdate
    })
    res.status(200).json({ msg: "updated !" })
  }
  catch (e) {
    res.status(500).json({ msg: e })
  }
}

exports.verify = async (req, res) => {
  const { userType, userId } = res.locals
  try {
    const model = userType ? userStore : userWho
    const user = await model.findById({ _id: userId })
    if (user) {
      res.status(201).json({ userData: user.getFieldToSend(), valideToken: true })
    }
    else {
      res.status(401).json({ valideToken: false })
    }
  }
  catch (e) {
    res.status(401).json({ userData: null, valideToken: false })
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