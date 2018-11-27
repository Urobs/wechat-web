const msgConfig = require('../msg-config')
const msgWrapper = require('./msg_wrapper')

function defaultWord () {
  const words = msgConfig.default
  return words[Math.floor(Math.random() * words.length)]
}

function replyDefault (ctx, infObj) {
  ctx.body = msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, defaultWord())
}

function subscribe (ctx, infObj) {
  ctx.body = msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, msgConfig.event.subscribe)
}

function text (ctx, infObj) {
  const isKeyWord = msgConfig.text[infObj["Content"]]
  if (isKeyWord) {
    ctx.body = msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, isKeyWord)
  } else {
    replyDefault (ctx, infObj)
  }
}

function image (ctx, infObj) {
  ctx.body = msgWrapper.imageMsg(infObj.FromUserName, infObj.ToUserName, infObj.MediaId)
}
module.exports = {
  event: {
    subscribe
  },
  text,
  image,
  voice: null,
  video: null,
  location: null,
  link: null,
  replyDefault
}