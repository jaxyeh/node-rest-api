const _ = require('lodash')
const path = require('path')
const knexfile = require('./knexfile')
const mailer = require('./mailer')

require('dotenv').config({ silent: true, path: path.join(__dirname, '..', '.env') })

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  EMAIL_FROM,
  REDIS_URL
} = process.env
const ENV = _.defaultTo(NODE_ENV, 'development')

module.exports = {
  appName: 'Rest API',
  env: ENV,
  port: _.defaultTo(PORT, 3000),
  db: knexfile[ENV],
  redis: REDIS_URL || 'redis://127.0.0.1:6379',

  bodyParser: {
    enableTypes: ['json']
  },

  cors: {
    origin: '*',
    exposeHeaders: ['Authorization'],
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
    keepHeadersOnError: true
  },

  nodemailer: mailer,
  emailConfirmationTimeout: 600, // 10 minutes
  emailFrom: _.defaultTo(EMAIL_FROM, 'Jason Yeh <jason@yehs.us'),

  jwtSecret: _.defaultTo(JWT_SECRET, 'secret'),
  jwtOptions: {
    expiresIn: '7d'
  }
}
