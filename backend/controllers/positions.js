const { getUserModel } = require('../helpers/')
const { OK, UNAUTHORIZED } = require('http-status')

exports.saveChangePosition = async (req, res) => {
  try {
    const { type, _id, longitude, latitude, ...rest } = req.body
    const model = getUserModel(userType)
    await model.findByIdAndUpdate({ _id: _id }, {
      location: {
        coordinates: [longitude, latitude]
      },
      ...rest
    })
    res.status(OK).json({ message: "save change positions" })
  }
  catch (ex) {
    res.status(UNAUTHORIZED).json({ message: ex.message })
  }
}