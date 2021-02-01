const express = require('express')
const router = express.Router()
const products = require('../controllers/products')
const authentification = require('../middleware/auth'
)
router.post('/broadcast', authentification, products.broadCastProduct)

module.exports = router