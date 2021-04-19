const express = require('express')
const notifications = require('../controllers/notifications')
const router = express.Router()
const authentication = require('../middleware/auth')

router.post('/delete', authentication, notifications.delete)
router.post('/get/user', authentication, notifications.user)
router.post('/get/store', authentication, notifications.store)
router.post('/response/store', authentication, notifications.storeResponse)

module.exports = router