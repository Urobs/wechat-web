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

async function text (ctx, infObj) {
  const reg = /https:\/\/www\./
  const isKeyWord = msgConfig.text[infObj["Content"]]
  if (reg.test(infObj["Content"])) {
    infObj.Url = infObj.Content
    ctx.body = await link(infObj)
  } else if (isKeyWord) {
    ctx.body = msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, isKeyWord)
  } else {
    replyDefault (ctx, infObj)
  }
}

function image (ctx, infObj) {
  ctx.body = msgWrapper.imageMsg(infObj.FromUserName, infObj.ToUserName, infObj.MediaId)
}

function link (infObj) {
  const url = infObj.Url
  return new Promise((resolve, reject) => {
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
        resolve(xmlBody)
      } else {
        reject('error')
      }
    }).catch(err => {
      reject(err)
    })
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
  link: null,
  replyDefault
}