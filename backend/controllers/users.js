const bcrypt = require('bcrypt')
const { CREATED, ACCEPTED, UNAUTHORIZED, OK } = require("http-status")

const socketMap = require('../models/socketMap')
const { getUserModel, createJwtToken } = require('../helpers')

exports.userSignUp = async (req, res) => {
  try {
    const { userType, ...userData } = req.body
    const { password, ...restOfFiled } = userData
    const hash = await bcrypt.hash(password, 10)

    const User = getUserModel(userType)
    const user = new User({ ...restOfFiled, password: hash })
    await user.save()

    const token = createJwtToken({
      userId: user._id,
      userType
    })
    res.cookie('token', token, { httpOnly: true })

    res.status(CREATED).json({ userType, information: user.getFieldToSend() })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { userType, password, email } = req.body
    const model = getUserModel(userType)
    let user = await model.findOne({ email })
    if (!user) {
      res.status(UNAUTHORIZED).json({ message: 'user not found !' })
    }

    let match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(UNAUTHORIZED).json({ message: 'user not found !' })
    }

    const token = createJwtToken({ userId: user._id, userType })
    res.cookie('token', token, { httpOnly: true })

    const dataToSend = user.getFieldToSend()
    res.status(ACCEPTED).json({
      userType,
      information: dataToSend
    })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
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

    const model = getUserModel(userType)
    const user = await model.findById({ _id: userId })

    if (user) {
      const match = await bcrypt.compare(oldPassword, user.password)
      if (match) {
        const hashPassword = await bcrypt.hash(newPassword, 10)
        const userUpdated = await model.findByIdAndUpdate({ _id: userId }, { password: hashPassword }, { new: true })

        res.status(OK).json({
          userData: userUpdated.getFieldToSend(),
          userType
        })
      }
      else {
        res.status(UNAUTHORIZED).json({ messge: 'Wrong credentials' })
      }
    }
    else {
      res.status(UNAUTHORIZED).json({ messge: 'Wrong credentials' })
    }
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.userSetInformation = async function (req, res) {
  try {
    const { forUpdate } = req.body
    const { userId, userType } = res.locals

    const userModel = getUserModel(userType)
    const updatedUser = await userModel.findByIdAndUpdate({ _id: userId }, {
      ...forUpdate
    }, { new: true })

    res.status(OK).json({ userData: updatedUser.getFieldToSend(), userType, })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.verify = async (req, res) => {
  try {
    const { userType, userId } = res.locals
    const model = getUserModel(userType)

    const user = await model.findById({ _id: userId })
    if (user) {
      res.status(ACCEPTED).json({ userType: userType, userData: user.getFieldToSend() })
    }
    else {
      res.status(UNAUTHORIZED).json({ msg: "user not found" })
    }
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.getInformation = async (req, res) => {
  try {
    const { userType, userId } = res.locals
    const model = getUserType(userType)
    const user = await model.findById({ _id: userId })

    if (user) {
      res.status(ACCEPTED).json({ userData: user.getFieldToSend() })
    }
    else {
      res.status(UNAUTHORIZED).json({ message: "user not found !" })
    }
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.socketMap = async (req, res) => {
  try {
    const { userId, socketId } = req.body

    const existId = await socketMap.findOne({ userId: userId })
    if (existId) {
      await socketMap.findByIdAndUpdate({ _id: existId._id }, { socketId: socketId })
    }
    else {
      const mapping = new socketMap({ userId, socketId })
      await mapping.save()
    }
    res.status(CREATED).json({ message: "created!" })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}