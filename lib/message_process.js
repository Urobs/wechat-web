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
  const reg = /https:\/\/www\./
  const isKeyWord = msgConfig.text[infObj["Content"]]
  if (reg.test(infObj["Content"])) {
    infObj.Url = infObj.Content
    link(ctx, infObj)
  } else if (isKeyWord) {
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
  insFetch(url).then(MediaIds => {
    if (MediaIds) {
      let xmlBody = ""
      MediaIds.forEach(mediaId => {
        if (mediaId.type === 'image') {
          xmlBody += msgWrapper.imageMsg(infObj.FromUserName, infObj.ToUserName, mediaId.media_id)
        } else {
          xmlBody += msgWrapper.videoMsg(infObj.FromUserName, infObj.ToUserName, mediaId.media_id)
        }
      });
      ctx.body = xmlBody
    } else {
      replyDefault (ctx, infObj)
    }
  }).catch(err => {
    throw new Error(err)
  })
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