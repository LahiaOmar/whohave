const express = require('express')
const router = express.Router()
const products = require('../controllers/products')
const authentification = require('../middleware/auth')

router.post('/delete', authentification, products.delete)
router.post('/send', authentification, products.send)

module.exports = router