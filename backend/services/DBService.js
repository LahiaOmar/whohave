const mongoose = require('mongoose')
const notificationModel = require('../models/notification')

class DBService {
  uri = 'mongodb+srv://justask-admin:justask00@justask.ricqn.mongodb.net/whohave?poolSize=5'
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
      console.log(`mongodb connection exception : ${ex.message}`)
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
      console.log(`mongodb disconnect exception ${ex.message}`)
    }
  }
}

module.exports = DBService