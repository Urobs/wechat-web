const auth = require('./auth')
const config = require('../config')
const getAccessToken = require('./get_accessToken')
const wechat = function (config) {
  this.config = config
  this.token = config.token
  this.appID = config.appID
  this.appScrect = config.appScrect
  this.apiDomain = config.apiDomain
  this.apiURL = config.apiURL
}

wechat.prototype.auth = auth
wechat.prototype.getAccessToken = getAccessToken
const wechatApp = new wechat(config) 

module.exports = wechatApp