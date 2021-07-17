const express = require('express')
const router = express.Router()
const users = require('../controllers/users')
const authentications = require("../middleware/auth")

router.post('/auth/signup', users.userSignUp)
router.post('/auth/login', users.userLogin)
router.post('/auth/logout', users.userLogout)
router.post('/auth/setPassword', authentications, users.setPassword)
router.post('/update', authentications, users.userSetInformation)
router.get('/getInformation', authentications, users.getInformation)
router.post('/verify', authentications, users.verify)
router.post('/socketMap', users.socketMap)

module.exports = router