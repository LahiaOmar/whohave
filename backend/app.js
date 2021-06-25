const express = require('express')
const http = require("http")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const users = require('./routes/users')
const products = require('./routes/products')
const positions = require('./routes/positions')
const storesType = require('./routes/storesType')
const notifications = require('./routes/notifications')

const DBService = require('./services/DBService')
const SocketService = require('./services/SocketService')

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const PORT = normalizePort(process.env.PORT || '4000');
const app = express()
const httpServer = http.Server(app)

const dbService = new DBService()
const socketService = new SocketService(httpServer)

dbService.connect().catch(console.dir)
socketService.connect()

dbService.watchChangeNotifications(data => socketService.sendNotification(data))

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/user', users)
app.use('/api/products', products)
app.use('/api/positions', positions)
app.use('/api/storesType', storesType)
app.use('/api/notifications', notifications)

httpServer.listen(PORT, () => console.log(`app listen on port ${PORT} ...`))

module.exports = app