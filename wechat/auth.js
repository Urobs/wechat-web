const crypto = require('crypto')

function auth (ctx) {
  let signature = ctx.query.signature
  let timestamp = ctx.query.timestamp
  let nonce = ctx.query.nonce
  let echostr = ctx.query.echostr

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
}

module.exports = auth