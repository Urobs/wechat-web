const msgConfig = require('../msg-config')
const msgWrapper = require('../lib/msgWrapper')

module.exports = async function (ctx) {
  const xmlMsg = ctx.request.body
  res = xmlMsg.xml
  const toUser = res.ToUserName
  const fromUser = res.FromUserName
  const msgType = res.MsgType.toLowerCase()
  if (msgConfig[msgType]) {
    if (msgType === 'event') {
      const event = res.Event.toLowerCase()
      if (event) {
        ctx.body = msgWrapper.txtMsg(fromUser, toUser, msgConfig[msgType][event])
      }
    } else {
      const content = res.Content
      if (msgConfig[msgType][content]) {
        ctx.body = msgWrapper.txtMsg(fromUser, toUser, msgConfig[msgType][content])
      } else {
        ctx.body = msgWrapper.txtMsg(fromUser, toUser, msgConfig["default"])
      }
    }
  } else {
    ctx.body = msgWrapper.txtMsg(fromUser, toUser, msgConfig["default"])
  }
}