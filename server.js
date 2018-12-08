const config = require('./config')
const app = require('./src/app')

/**
 * DATABASE
 */

const { Model } = require('objection')
const knex = require('./src/db')
Model.knex(knex)

/**
 * HTTP SERVER
 */
const http = require('http')
app.server = http.createServer(app.callback())

app.server.on('listening', () => {
  var addr = app.server.address()
  var port = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`API Server (${config.env}) listening on ${port}`)
})

app.server.listen(config.port)

module.exports = app.server
