module.exports = function errorHanler () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = 400
      ctx.body = {
        code: err.code || 'internal:unknown_error',
        message: err.message || ''
    }
      ctx.app.emit('error', err, ctx)
    }
  }
}