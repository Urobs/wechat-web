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
    const xmlData = await link(infObj)
    return xmlData
  } else if (isKeyWord) {
    return msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, isKeyWord)
  } else {
    return msgWrapper.txtMsg(infObj.FromUserName, infObj.ToUserName, defaultWord())
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

function voice (ctx, infObj) {
  replyDefault(ctx, infObj, '你的声音真好听哎~')
}

function location (ctx, infObj) {
  replyDefault(ctx, infObj, '我在你的心里')
}

function location (ctx, infObj) {
  replyDefault(ctx, infObj, '好好说话不好ma， 非要发视频哼')
}

module.exports = {
  event: {
    subscribe
  },
  text,
  image,
  voice,
  video,
  location,
  link: null,
  replyDefault
}