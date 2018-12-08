const Boom = require('boom')

module.exports = async (ctx, next) => {
  if (!ctx.state.user) {
    ctx.throw(Boom.unauthorized())
  }
  return next()
}
