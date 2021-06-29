const express = require('express')
const router = express.Router()
const products = require('../controllers/products')

const authentification = require('../middleware/auth')
const imagesUploder = require('../middleware/ImagesStorage')

router.delete('/delete/:productId', authentification, products.delete)
router.post('/send', authentification, imagesUploder.array('files'), products.send)
router.get('/image/:imageId', authentification, products.sendImage)

module.exports = router