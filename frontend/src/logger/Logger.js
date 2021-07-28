import { createLogger, transports, config, format } from 'winston'

const { combine, timestamp, printf } = format
const { info, debug } = config.npm.levels

const outFormat = printf(({ level, message, timestamp }) => {
  return `CLIENT LOGS - Time : ${timestamp} - Level [${level}] - Message ${message}`
})

const trConfig = {
  http: {
    level: 'info',
    host: 'http://localhost/',
    port: '4000',
    path: '/api/user/logs'
  },
  console: {
    level: 'debug',
    handleException: true,
    json: false,
    colorsize: true
  }
}

const logger = createLogger({
  format: combine(
    timestamp(),
    outFormat
  ),
  transports: [
    new transports.Console(trConfig.console),
    new transports.Http(trConfig.http)
  ],
  exitOnError: false
})

export default logger