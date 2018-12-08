const config = require('./config')
const app = require('./src/app')

/**
 * DATABASE
 */

const { Model } = require('objection')
// const { knexTinyLogger } = require('knex-tiny-logger')
const knex = require('./src/db')
// console.log(knexTinyLogger)
// knexTinyLogger(knex)
Model.knex(knex)

/**
 * HTTP SERVER
 */
const http = require('http')
app.server = http.createServer(app.callback())

app.server.on('listening', () => {
  var addr = app.server.address()
  var port = typeof addr === 'string' ? `pipe ${addr}` : `${addr.address}:${addr.port}`
  console.log(`API Server (${config.env}) listening on ${port}`)
})

app.server.listen(config.appServer.port)

module.exports = app.server
