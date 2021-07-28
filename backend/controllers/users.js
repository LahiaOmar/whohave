const { CREATED, ACCEPTED, UNAUTHORIZED, OK } = require("http-status")
const logger = require('../logger')
const socketMap = require('../models/socketMap')

const {
  getUserModel,
  createJwtToken,
  createHash,
  compareHash } = require('../helpers')

exports.userSignUp = async (req, res) => {
  try {
    const { userType, ...userData } = req.body
    const { password, ...restOfFiled } = userData
    const hash = await createHash(password)

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
    logger.error(`Route:UserSignin - ${ex}`)
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.userLogin = async (req, res) => {
  try {
    const { userType, password, email } = req.body
    const model = getUserModel(userType)
    let user = await model.findOne({ email })
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'user not found !' })
    }

    let match = await compareHash(password, user.password)
    if (!match) {
      return res.status(UNAUTHORIZED).json({ message: 'user not found !' })
    }

    const token = await createJwtToken({ userId: user._id, userType })
    res.cookie('token', token, { httpOnly: true })

    const dataToSend = user.getFieldToSend()
    res.status(ACCEPTED).json({
      userType,
      information: dataToSend
    })
  }
  catch (ex) {
    logger.error(`Route:UserLogin - ${ex}`)
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.userLogout = (req, res) => {
  res.clearCookie('token')
  res.status(OK).json("token removed")
}

exports.setPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const { userId, userType } = res.locals

    const model = getUserModel(userType)
    const user = await model.findById({ _id: userId })
    const match = await compareHash(oldPassword, user.password)
    if (!user || !match) {
      return res.status(UNAUTHORIZED).json({ message: 'Wrong Credentials' })
    }

    const hashPassword = await createHash(newPassword)
    const userUpdated = await model.findByIdAndUpdate({ _id: userId }, { password: hashPassword }, { new: true })

    res.status(OK).json({
      userData: userUpdated.getFieldToSend(),
      userType
    })
  }
  catch (ex) {
    logger.error(`Route:SetPassword - ${ex}`)
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
    logger.error(`Route:UserSetInformation - ${ex}`)
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
      res.status(UNAUTHORIZED).json({ message: "user not found" })
    }
  }
  catch (ex) {
    logger.error(`Route:Verify- ${ex}`)
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
    logger.error(`Route:GetInformation - ${ex}`)
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
    logger.error(`Route:socketMap - ${ex}`)
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.saveLogs = async (req, res) => {
  console.log("req", req.body)
  res.status(OK).json('exception is saved !')
}