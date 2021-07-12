const mongooseDummy = require('mongoose-dummy')

const UserModel = require('../models/user')
const StoreModel = require('../models/userStore')

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

module.exports = { getStore, getUser }
