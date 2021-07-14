const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModel = require('../models/user')
const StoreModel = require('../models/userStore')

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

const createHash = (password) => {
  const SALT_ROUNDS = 10
  return bcrypt.hash(password, SALT_ROUNDS)
}

const compareHash = (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword)
}

module.exports = {
  getUserModel,
  createJwtToken,
  createHash,
  compareHash
}