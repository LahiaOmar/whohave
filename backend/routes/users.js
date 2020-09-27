const express = require('express')
const users = require('../controllers/users')
const router = express.Router()

router.post('/auth/storeSignup', users.storeSignUp)
router.post('/auth/userSignup', users.userSignUp)
router.post('/auth/login', users.userLogin)
router.post('/updateUser', users.userSetInformation)
module.exports = router