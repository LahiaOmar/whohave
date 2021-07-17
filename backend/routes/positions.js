const express = require('express')
const router = express.Router()
const positions = require('../controllers/positions')

const {
  SAVE,
} = process.env

router.post(SAVE, positions.saveChangePosition)

module.exports = router