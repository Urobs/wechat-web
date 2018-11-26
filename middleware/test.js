const wechat = require('../wechat/wechat')
module.exports = async function (ctx) {
  ctx.body = await wechat.getAccessToken()
}