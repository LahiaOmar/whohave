const winston = require('winston')

const config = {
  file: {
    level: 'info',
    filename: '../logs/app.log',
    handleException: true,
    json: true,
    maxsize: 5242880,
    colorsize: false
  },
  console: {
    level: 'debug',
    handleException: true,
    json: false,
    colorsize: true,
  }
}

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(config.file),
    new winston.transports.Console(config.console)
  ],
  exitOnError: false
})

console.log(logger)

module.exports = logger