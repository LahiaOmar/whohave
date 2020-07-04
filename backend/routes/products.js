const express = require('express')
const router = express.Router()
const products = require('../controllers/products')

router.post('/broadcast', products.broadCastProduct)

module.exports = router