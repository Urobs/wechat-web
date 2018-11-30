const config = require('../config')
const jwt = require('jsonwebtoken')
const secret = config.jwt.secret
const { username, password } = config.admin

module.exports = async function (ctx) {
  const authName = ctx.request.body.username
  const authPsw = ctx.request.body.password
  console.log(secret)
  if (authName===username && authPsw==password) {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' })
    ctx.body = {
      message: 'ok',
      token
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'authorized failed, please check your name and password'
    }
  }
}