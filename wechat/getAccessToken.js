const accessToken = require('./accessToken')
const APIError = require('../lib/apiError')
const fs = require('fs')
const requestGet = require('../lib/requestGet')
const util = require('util')

function getAccessToken() {
  const that = this
  return new Promise((resolve, reject) => {
    const currentTime = new Date().getTime()
    const url = util.format(that.apiURL.accessTokenApi, that.apiDomain, that.appID, that.appScrect)
    if (accessToken.access_token === "" || accessToken.expires_time < currentTime) {
      requestGet(url).then((data) => {
        const result = JSON.parse(data)
        if (data.indexOf("errcode") < 0) {
          accessToken.access_token = result.access_token
          accessToken.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
          fs.writeFile('./wechat/accessToken.json', JSON.stringify(accessToken), err => { 
            if (err) { reject(err) }
            resolve(accessToken.access_token)
          })
        } else {
          resolve(result)
        }
      }).catch(err => { reject(err) })
    } else {
      resolve(accessToken.access_token)
    }
  })
}

module.exports = getAccessToken