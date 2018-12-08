module.exports = async (ctx, next) => {
  try {
    await next()
    // Handle 404 fallback
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404)
    }
  } catch (err) {
    if (ctx.log) ctx.log.error(err)
    if (err.isBoom) {
      ctx.body = err.output.payload
      ctx.status = err.output.statusCode
    } else {
      ctx.body = err.message
      ctx.status = err.status || 500
    }
    ctx.app.emit('error', err, ctx)
  }
}
