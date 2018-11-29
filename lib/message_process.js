const insFetch = require('./ins_fetcher')
const msgConfig = require('../msg-config')
const msgWrapper = require('./msg_wrapper')

function defaultWord () {
  const words = msgConfig.default
  return words[Math.floor(Math.random() * words.length)]
}

function replyDefault (ctx, infObj, customMessage=null) {
  let word = defaultWord()
  if (customMessage) {
    word = customMessage
  }
  ctx.body = msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, word)
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

function link (ctx, infObj) {
  const url = infObj.Url
  const MediaIds = insFetch(url)
  if (MediaIds) {
    let xmlBody = ""
    MediaIds.forEach(mediaId => {
      xmlBody += msgWrapper.imageMsg(infObj.FromUserName, infObj.ToUserName, mediaId)
    });
    ctx.body = xmlBody
  } else {
    replyDefault (ctx, infObj)
  }
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
  link,
  replyDefault
}