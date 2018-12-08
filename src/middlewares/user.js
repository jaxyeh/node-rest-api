const { has } = require('lodash')
const User = require('../models/User')

module.exports = async (ctx, next) => {
  if (has(ctx, 'state.jwt.sub.id')) {
    ctx.state.user = await User.query().findById(ctx.state.jwt.sub.id)
  }
  return next()
}
