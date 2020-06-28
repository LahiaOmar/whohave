const express = require('express')
const users = require('./routes/users')
const mongoos = require("mongoose")
const app = express()

mongoos.connect('mongodb://localhost:27017/whohave', { 
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(()=> console.log("connection to mongoDB"))
  .catch((e)=>console.log("error connection to mongoDB", e))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())

app.use('/api/auth', users)

module.exports = app