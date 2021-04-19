const mongoos = require('mongoose')
const notificationModel = require('../models/notification')

class DBService {

  constructor(uri) {
    this.uri = uri
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