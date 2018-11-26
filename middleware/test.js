const wechat = require('../wechat/wechat')
module.exports = async function (ctx, next) {
  ctx.body = await wechat.getAccessToken()
}