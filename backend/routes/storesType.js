const express = require('express')
const router = express.Router()
const storesType = require('../controllers/storesType')

router.post('/get', storesType.get)
router.post('/add', storesType.add)

module.exports = router