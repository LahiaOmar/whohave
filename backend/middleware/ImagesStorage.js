const multer = require('multer')
const path = require('path')
const { v4: uuid } = require('uuid')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploadImages')),
  filename: (req, file, cb) => cb(null, uuid())
})

const imagesUploder = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const imagesType = /jpeg|jpg|png/
    const mimeTypeImg = imagesType.test(file.mimetype)
    cb(null, mimeTypeImg)
  }
})

module.exports = imagesUploder