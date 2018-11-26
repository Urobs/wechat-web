const crypto = require('crypto')

function auth (ctx) {
  let signature = ctx.query.signature
  let timestamp = ctx.query.timestamp
  let nonce = ctx.query.nonce
  let echostr = ctx.query.echostr
  if (signature && timestamp && nonce && echostr) {
    const array = [this.token, timestamp, nonce]
    array.sort()

    const tempStr = array.join('')
    const hashCode = crypto.createHash('sha1')
    const resultCode = hashCode.update(tempStr, 'utf8').digest('hex')
    if (resultCode === signature) {
      ctx.body = echostr
    } else {
      ctx.body = 'mismatch'
    }
  } else {
    ctx.body = 'bad request'
  }
}

module.exports = auth