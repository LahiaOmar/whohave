const consumer = require('../models/user')
const storeOwner = require('../models/userStore')

exports.getNotifications = async (req, res) => {
  // return all notifications for a specific user. base on userId.
  const { type, userId } = req.body
  console.log("type user ", type, userId)
  const model = type ? storeOwner : consumer
  try {
    const user = await model.findById({ _id: userId })
    console.log("user ", user)
    const { notifications } = user;
    res.status(200).json({ notifications: notifications })
  }
  catch (e) {
    res.status(400).json({ err: e })
  }
}