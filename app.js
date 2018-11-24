const Koa = require('koa')
const loggerAsync = require('./middleware/logger')
const router = require('./middleware/router')

const app = new Koa()
app.use(loggerAsync())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(80)
console.log('the server is listening at port 80')