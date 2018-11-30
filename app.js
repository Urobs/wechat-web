const APIError = require('./lib/apierror')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const errorHandler = require('./middleware/error_handler')
const jwtKoa = require('koa-jwt')
const Koa = require('koa')
const loggerAsync = require('./middleware/logger')
const router = require('./middleware/router')
const xmlParser = require('koa-xml-body')

const app = new Koa()
app.use(errorHandler())
app.use(loggerAsync())
app.use(
  jwtKoa({ secret: config.jwt.secret })
  .unless({ path: [/\//, /\/auth/] })
)
app.use(xmlParser({ 
  xmlOptions: { explicitArray: false },
  onerror: err => { throw new APIError(err.status, err.message) }
}))
app.use(bodyParser())
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('the server is listening at port 3000')