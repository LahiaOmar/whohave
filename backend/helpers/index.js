const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModel = require('../models/user')
const StoreModel = require('../models/userStore')
const ProductModel = require('../models/products')

/**
 * models Names
 */
const modelNames = {
  PRODUCT: 'PRODUCT',
  STORE: 'STORE',
  USER: 'USER',
}

/**
 * 
 * @param {string} name - model name 
 * @returns Mongoose Model
 */
const getModel = (name) => {
  const { PRODUCT, STORE, USER } = modelNames

  switch (name) {
    case PRODUCT:
      return ProductModel
    case STORE:
      return StoreModel
    case USER:
      return UserModel
    default:
      throw Error(`Wrong Model Name ${name}`)
  }
}


/**
 * 
 * @param {string} profile - The type of the user, [USER OR STORE] 
 * @returns Compiled user Schema or Error
 */
const getUserModel = (profile) => {
  switch (profile) {
    case 'STORE':
      return StoreModel
    case 'USER':
      return UserModel
    default:
      throw new Error(`PROFILE USER DONT EXIST -${profile}-`)
  }
}

/**
 * 
 * @param {Object} payload - data to encode
 * @param {Object} options - jwt prameters
 * @returns {string} jwt token
 */
const createJwtToken = (payload, options) => {
  try {
    const PRIVATE_KEY = "RANDOM-KEY"
    return jwt.sign(payload, PRIVATE_KEY, { expiresIn: '24h', ...options })
  }
  catch (ex) {
    throw new Error(ex.message)
  }
}

/**
 * verify token validation, and decode the payload
 * @param {string} token 
 * @returns decoded token
 */
const verifyToken = (token) => {
  const PRIVATE_KEY = "RANDOM-KEY"
  return jwt.verify(token, PRIVATE_KEY)
}

/**
 * create a hash from a string password
 * @param {string} password 
 * @returns hash password
 */
const createHash = (password) => {
  const SALT_ROUNDS = 10
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * compart password and his hash
 * @param {string} password 
 * @param {string} encryptedPassword 
 * @returns {boolean}
 */
const compareHash = (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword)
}

module.exports = {
  modelNames,
  getModel,
  getUserModel,
  createJwtToken,
  verifyToken,
  createHash,
  compareHash
}