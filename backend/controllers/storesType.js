const storesType = require('../models/storesType')
const { OK, UNAUTHORIZED, CREATED } = require('http-status')

exports.get = async (req, res) => {
  try {
    const types = await storesType.find()

    res.status(OK).json(types)
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message })
  }
}

exports.add = async (req, res) => {
  try {
    let { specialty } = req.body
    specialty = specialty.toLowerCase().trim()

    let storeType = new storesType({ specialty })
    storeType = await storeType.save()
    const allTypes = await storesType.find()

    res.status(CREATED).json(allTypes)
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ message: ex.message })
  }
}