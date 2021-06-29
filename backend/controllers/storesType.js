const storesType = require('../models/storesType')
const httpStatus = require('http-status')

exports.get = async (req, res) => {
  try {
    const types = await storesType.find()

    res.status(httpStatus.OK).json(types)
  }
  catch (ex) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

exports.add = async (req, res) => {
  try {
    let { specialty } = req.body
    specialty = specialty.toLowerCase().trim()

    let storeType = new storesType({ specialty })
    storeType = await storeType.save()
    const allTypes = await storesType.find()

    res.status(httpStatus.CREATED).json(allTypes)
  }
  catch (ex) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}