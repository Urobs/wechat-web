const config = require('../config')
const wechat = require('../wechat/wechat')
const jwt = require('jsonwebtoken')

module.exports = async function (ctx) {
  const token = ctx.header.authorization
  const decoded = jwt.verify(token.split(' ')[1], config.jwt.secret)
  if (decoded.username === config.admin.username) {
    ctx.body = await wechat.getAccessToken()
  }
}