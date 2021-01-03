const express = require('express')
const users = require('../controllers/users')
const router = express.Router()
const authentications = require("../middleware/auth")

router.post('/auth/storeSignup', users.storeSignUp)
router.post('/auth/userSignup', users.userSignUp)
router.post('/auth/login', users.userLogin)
router.post('/auth/setPassword', users.setPassword)
router.post('/updateUser', users.userSetInformation)
router.post('/verify', authentications, users.verify)
module.exports = router