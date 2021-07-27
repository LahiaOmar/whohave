const {
  config,
  transports,
  format,
  createLogger
} = require('winston')
const path = require('path')

const { combine, timestamp, label, printf } = format

const outFormat = printf(({ level, message, timestamp }) => {
  return `Time : ${timestamp} - Level [${level}] - Message : ${message}`
})

const TransporterConfig = {
  file: {
    level: 'info',
    filename: path.join('./', 'logs', 'app.log'),
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

const logger = createLogger({
  format: combine(
    timestamp(),
    outFormat
  ),
  transports: [
    new transports.File(TransporterConfig.file),
    new transports.Console(TransporterConfig.console)
  ],
  exitOnError: false
})

module.exports = logger