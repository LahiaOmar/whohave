const express = require('express')
const notifications = require('../controllers/notifications')
const router = express.Router()
const authentication = require('../middleware/auth')

router.delete('/delete/:storeId/:productId', authentication, notifications.delete)
router.get('/get/user', authentication, notifications.user)
router.get('/get/store', authentication, notifications.store)
router.post('/response/store', authentication, notifications.storeResponse)

module.exports = router