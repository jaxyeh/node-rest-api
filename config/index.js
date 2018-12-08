const _ = require('lodash')
const path = require('path')
const knexfile = require('./knexfile')
const mailer = require('./mailer')

require('dotenv').config({ silent: true, path: path.join(__dirname, '..', '.env') })

const { NODE_ENV, PORT, HOST, JWT_SECRET, EMAIL_FROM} = process.env
const ENV = _.defaultTo(NODE_ENV, 'development')

module.exports = {
  appName: 'Rest API',

  appServer: {
    port: _.defaultTo(PORT, 3000),
    // host: _.defaultTo(HOST, 'localhost')
  },

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

  confirmTimeout: 600, // 10 minutes

  db: knexfile[ENV],

  mailer,

  emailFrom: _.defaultTo(EMAIL_FROM, 'Jason Yeh <jason@yehs.us'),

  env: ENV,

  jwtSecret: _.defaultTo(JWT_SECRET, 'secret'),

  jwtOptions: {
    expiresIn: '7d'
  }
}
