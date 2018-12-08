const config = require('../config')

/**
 * KOA ENGINE
 */
const Koa = require('koa')
const logger = require('koa-logger')

const app = new Koa()
app.use(logger())

/**
 * CORE
 */
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser')
const responseTime = require('koa-response-time')
// const mount = require('koa-mount')
// const cors = require('@koa/cors')
// const serveStatic = require('koa-static')

if (config.env === 'production') {
  app.use(responseTime())
  app.use(helmet())
}
app.use(cors(config.cors))
app.use(bodyParser(config.bodyParser))

/**
 * CUSTOM MIDDLEWARES
 */
const databaseMiddleware = require('./middlewares/database')
const errorMiddleware = require('./middlewares/error')
const jwtMiddleware = require('./middlewares/jwt')
const userMiddleware = require('./middlewares/user')

app.use(errorMiddleware)
app.use(databaseMiddleware)
app.use(jwtMiddleware)
app.use(userMiddleware)

/**
 * ROUTES
 */
const Boom = require('boom')
const routes = require('./routes')

app.use(routes.routes())
app.use(routes.allowedMethods({
  throw: true,
  notImplemented: () => Boom.notImplemented(),
  methodNotAllowed: () => Boom.methodNotAllowed()
}))

module.exports = app
