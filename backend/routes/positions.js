const express = require('express')
const router = express.Router()
const positions = require('../controllers/positions')
router.post('/', positions.saveChangePosition)

module.exports = router