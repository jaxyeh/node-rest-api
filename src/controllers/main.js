const Boom = require('boom')

module.exports.boom = async (ctx) => {
  ctx.throw(Boom.forbidden())
}

module.exports.check = async (ctx) => {
  ctx.body = { healthy: true, time: Date.now() }
}
