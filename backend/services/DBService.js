const mongoose = require('mongoose')
const notificationModel = require('../models/notification')
const logger = require('../logger')

class DBService {
  uri = process.env.MONGODB_URI
  constructor() {
    mongoose.set('useFindAndModify', false);
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }
    catch (ex) {
      logger.error(`mongodb connection exception : ${ex.message}`)
    }
  }

  watchChangeNotifications(onChange) {
    notificationModel.watch().on('change', (data) => onChange(data))
  }

  async disconnect() {
    try {
      await mongoose.disconnect()
    }
    catch (ex) {
      logger.error(`mongodb disconnect exception ${ex.message}`)
    }
  }
}

module.exports = DBService