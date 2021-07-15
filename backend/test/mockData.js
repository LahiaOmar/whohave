const mongooseDummy = require('mongoose-dummy')

const UserModel = require('../models/user')
const StoreModel = require('../models/userStore')
const ProductModel = require('../models/products')
const { modelNames, getModel } = require('../helpers')

const ignore = ['location', '_id', '__v', 'socketId']

const remove = () => Math.round(Math.random())

const getStore = ({ allField }) => {
  return mockUser('STORE', allField)
}

const getUser = ({ allField }) => {
  return mockUser('USER', allField)
}

const mockUser = (userType, allField) => {
  const model = userType == "STORE" ? StoreModel : UserModel

  const dummy = mongooseDummy(model, { ignore })
  if (allField) {
    return { ...dummy, userType }
  }
  else {
    for (const key in dummy) {
      if (remove())
        delete dummy[key]
    }
    return { ...dummy, userType }
  }
}

const mockModel = (model, allField) => {
  const dummy = mongooseDummy(model, { ignore })

  if (!allField)
    for (const key in dummy) {
      if (remove())
        delete dummy[key]
    }

  return dummy
}

const getMockModel = ({ name, allField }) => {
  return mockModel(getModel(name), allField)
}




module.exports = { getStore, getUser, getMockModel }
