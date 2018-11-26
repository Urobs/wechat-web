module.exports = function errorHanler () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {"msg": 'something goes wrong'}
      ctx.app.emit('error', err, ctx)
    }
  }
}