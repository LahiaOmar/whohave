const express = require('express')
const router = express.Router()
const products = require('../controllers/products')

const authentification = require('../middleware/auth')
const imagesUploder = require('../middleware/ImagesStorage')

const {
  DELETE_P,
  SEND,
  GET_IMAGE,
} = process.env

router.delete(DELETE_P, authentification, products.delete)
router.post(SEND, authentification, imagesUploder.array('files'), products.send)
router.get(GET_IMAGE, authentification, products.sendImage)

module.exports = router