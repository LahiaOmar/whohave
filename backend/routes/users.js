const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const authentications = require("../middleware/auth")

const {
  SIGNUP,
  LOGIN,
  LOGOUT,
  UPDATE_PASSWORD,
  UPDATE,
  GET_USER,
  VERIFY,
  SOCKET,
  LOGS
} = process.env

router.post(SIGNUP, users.userSignUp)
router.post(LOGIN, users.userLogin)
router.post(LOGOUT, users.userLogout)
router.post(UPDATE_PASSWORD, authentications, users.setPassword)
router.post(UPDATE, authentications, users.userSetInformation)
router.get(GET_USER, authentications, users.getInformation)
router.post(VERIFY, authentications, users.verify)
router.post(SOCKET, users.socketMap)
router.post(LOGS, users.saveLogs)

module.exports = router