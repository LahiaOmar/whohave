const express = require('express')
const notifications = require('../controllers/notifications')
const router = express.Router()
const authentication = require('../middleware/auth')

router.post('/get', authentication, notifications.getNotifications)

module.exports = router