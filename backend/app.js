const express = require('express')
const mongoos = require("mongoose")
const socket = require("socket.io")
const http = require("http")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const users = require('./routes/users')
const products = require('./routes/products')
const positions = require('./routes/positions')
const storesType = require('./routes/storesType')
const notifications = require('./routes/notifications')

const connections = require('./notification/connections')

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
const io = socket(httpServer, { origins: '*:*' })

mongoos.connect('mongodb://localhost:27017/whohave', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("connection to mongoDB"))
  .catch((e) => console.log("error connection to mongoDB", e))

app.use(cors())

app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
  req.io = io;
  next()
})

io.on('connection', connections.socketConnected)

app.use('/api/user', users)
app.use('/api/products', products)
app.use('/api/positions', positions)
app.use('/api/storesType', storesType)
app.use('/api/notifications', notifications)

httpServer.listen(PORT, () => console.log(`app listen on port ${PORT} ...`)) 