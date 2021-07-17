const express = require('express')
const notifications = require('../controllers/notifications')
const router = express.Router()
const authentication = require('../middleware/auth')

const {
  DELETE_N,
  GET_USER,
  GET_STORE,
  RESPONSE,
} = process.env

router.delete(DELETE_N, authentication, notifications.delete)
router.get(GET_USER, authentication, notifications.user)
router.get(GET_STORE, authentication, notifications.store)
router.post(RESPONSE, authentication, notifications.storeResponse)

module.exports = router