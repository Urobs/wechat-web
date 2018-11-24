const config = require('./config')
const Koa = require('koa')
const loggerAsync = require('./middleware/logger')
const router = require('./middleware/router')

const app = new Koa()
app.use(loggerAsync())
app.use(router.routes())

app.listen(80)
console.log('the server is listening at port 80')