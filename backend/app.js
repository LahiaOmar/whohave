require('dotenv').config()

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

const {
  MODULE_USERS,
  MODULE_PRODUCTS,
  MODULE_NOTIFICATIONS,
  MODULE_STORESTYPE,
  MODULE_POSITIONS
} = process.env

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

app.use(MODULE_USERS, users)
app.use(MODULE_PRODUCTS, products)
app.use(MODULE_POSITIONS, positions)
app.use(MODULE_STORESTYPE, storesType)
app.use(MODULE_NOTIFICATIONS, notifications)


module.exports = httpServer