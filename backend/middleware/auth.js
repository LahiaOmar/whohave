const jwt = require("jsonwebtoken")
const { UNAUTHORIZED } = require('http-status')

module.exports = async (req, res, next) => {
  try {
    const { cookies } = req
    const decodeToken = await jwt.verify(cookies.token, "RANDOM_SECRECT_KEY")
    const { userId, userType } = decodeToken
    res.locals.userId = userId
    res.locals.userType = userType
    next()
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ error: ex.message, valideToken: false })
  }
}