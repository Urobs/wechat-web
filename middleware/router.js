const config = require('../config')
const crypto = require('crypto')
const Router = require('koa-router')

let home = new Router()
home.get('/', async (ctx) => {
  let signature = ctx.query.signature
  let timestamp = ctx.query.timestamp
  let nonce = ctx.query.nonce
  let echostr = ctx.query.echostr

  const array = [config.token, timestamp, nonce]
  array.sort()

  const tempStr = array.join('')
  const hashCode = crypto.createHash('sha1')
  const resultCode = hashCode.update(tempStr, 'utf8').digest('hex')
  if (resultCode === signature) {
    ctx.body = echostr
  } else {
    ctx.body = 'mismatch'
  }
})

let router = new Router()
router.use('/', home.routes())

module.exports = router