const mongoos = require('mongoose')
const notificationModel = require('../models/notification')

class DBService {
  uri = 'mongodb+srv://justask-admin:justask00@justask.ricqn.mongodb.net/whohave'
  constructor() {
  }

  async connect() {
    await mongoos.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  watchChangeNotifications(onChange) {
    notificationModel.watch().on('change', (data) => onChange(data))
  }

}

module.exports = DBService