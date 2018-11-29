const wechat = require('../wechat/wechat')
const request = require('request')
const util = require('util')

function pipeData(getUrls, type) {
  let result = []
  wechat.getAccessToken().then((accessToken) => {
    const postUrl = util.format(wechat.apiURL.createMedia, wechat.apiDomain, accessToken, type)
    request
    .get(getUrl)
    .pipe(
      request.post(postUrl)
      .on('response', res => {
        return res.body
      })
      .on('error', (err) => {
        throw new Error(err)
      })
    )
  }).catch(err => { console.log(err) })
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
    request(options, (error, response, body) => {
      if (error) { throw new Error(error) }
      const data = JSON.parse(body).graphql.shortcode_media
      const type = data.__typename
      if (type === 'GraphImage') {
        pipeData([data.display_url], 'image')
      } else if (type === 'GraphVideo') {
        pipeData([data.video_url], 'video')
      } else {

      }
    })
  } else {
    return null
  }
}
module.exports = insFetcher