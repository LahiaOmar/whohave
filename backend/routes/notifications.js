const express = require('express')
const notifications = require('../controllers/notifications')
const router = express.Router()

router.post('/get', notifications.getNotifications)

module.exports = router