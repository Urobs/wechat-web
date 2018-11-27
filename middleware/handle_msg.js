const msgProcess = require('../lib/message_process')

module.exports = async function (ctx) {
  const xmlMsg = ctx.request.body
  res = xmlMsg.xml
  const msgType = res.MsgType.toLowerCase()
  if (msgProcess[msgType]) {
    if (msgType === 'event') {
      const event = res.Event.toLowerCase()
      if (msgProcess[msgType][event]) { 
        msgProcess[msgType][event](ctx, res)
      }
    }
    else { msgProcess[msgType](ctx, res) }
  } else {
    msgProcess.replyDefault(ctx, res)
  }
}