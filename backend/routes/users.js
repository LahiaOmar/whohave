const express = require('express')
const users = require('../controllers/users')
const router = express.Router()

router.post('/storeSignup', users.storeSignUp)
router.post('/userSignup', users.userSignUp)

module.exports = router