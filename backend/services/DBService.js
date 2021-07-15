const mongoose = require('mongoose')
const notificationModel = require('../models/notification')

class DBService {
  uri = 'mongodb+srv://justask-admin:justask00@justask.ricqn.mongodb.net/whohave?poolSize=5'
  constructor() {
    mongoose.set('useFindAndModify', false);
  }

  async connect() {
    await mongoose.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  watchChangeNotifications(onChange) {
    notificationModel.watch().on('change', (data) => onChange(data))
  }

  async disconnect() {
    await mongoose.disconnect()
  }
}

module.exports = DBService