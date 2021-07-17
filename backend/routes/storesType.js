const express = require('express')
const router = express.Router()
const storesType = require('../controllers/storesType')

const {
  GET,
  ADD
} = process.env

router.get(GET, storesType.get)
router.post(ADD, storesType.add)

module.exports = router