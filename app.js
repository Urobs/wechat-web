const APIError = require('./lib/apiError')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./middleware/errorHandler')
const Koa = require('koa')
const loggerAsync = require('./middleware/logger')
const router = require('./middleware/router')
const xmlParser = require('koa-xml-body')

const app = new Koa()
app.use(errorHandler())
app.use(loggerAsync())
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