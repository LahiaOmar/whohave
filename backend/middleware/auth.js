const { UNAUTHORIZED } = require('http-status')
const { verifyToken } = require('../helpers')

module.exports = async (req, res, next) => {
  try {
    const { cookies } = req
    const decodeToken = await verifyToken(cookies.token)
    const { userId, userType } = decodeToken
    res.locals.userId = userId
    res.locals.userType = userType
    next()
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message, valideToken: false })
  }
}