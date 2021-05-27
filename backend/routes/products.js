const express = require('express')
const router = express.Router()
const products = require('../controllers/products')
const authentification = require('../middleware/auth')
const multer = require('multer')

const storage = multer.memoryStorage()
const uploader = multer({ storage })

router.post('/delete', authentification, products.delete)
router.post('/send', authentification, uploader.array('files'), products.send)

module.exports = router