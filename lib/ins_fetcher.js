const insParser = require('./parse_ins_api_data')
const wechat = require('../wechat/wechat')
const request = require('request')
const util = require('util')

function pipeData(getUrls, type) {
  type = type.substr(5, 5).toLowerCase()
  return new Promise((resolve, reject) => {
    wechat.getAccessToken().then((accessToken) => {
    const postUrl = util.format(wechat.apiURL.createMedia, wechat.apiDomain, accessToken, type)
    let promises = []
    getUrls.forEach(getUrl => {
      const p = new Promise((resolve, reject) => {
        request
          .get(getUrl)
          .on('response', response => {
            const filename = (type === 'image')?'upload.jpg':'upload.mp4'
            const contentType = (type === 'image')?'image/jpeg':'video/mp4'
            const formData = {
              custom_file: {
                value: response,
                options: {
                  filename,
                  contentType
                }
              }
            }
            request.post({ url: postUrl, formData }, (err, response, body) => {
              if (err) { reject(err) }
              resolve(JSON.parse(body))
            })
          })
          .on('error', err => {
            reject(err)
          })
      })
      promises.push(p)
    })
    Promise.all(promises).then(mediaIds => {
      resolve(mediaIds)
    }).catch(err => {
      reject(err)
    })
  }).catch(err => { console.log(err) })
  })
}

function insFetcher (url) {
  const reg = /https:\/\/www\.instagram\.com\/p\/\S{11}/
  const result = reg.exec(url)
  if (result) {
    const apiUrl = result[0] + '/?__a=1'
    const options = {
      url: apiUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
      }
    }
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) { throw new Error(error) }
        const data = JSON.parse(body).graphql.shortcode_media
        const { sourceUrls, sourceType } = insParser(data)
        pipeData(sourceUrls, sourceType).then(media => {
          resolve(media)
        }).catch(err => { reject(err) })
      })
    })
  } else {
    return null
  }
}
module.exports = insFetcher