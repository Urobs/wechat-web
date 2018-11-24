const auth = require('./auth')
const config = require('../config')
const wechat = function (config) {
  this.config = config
  this.token = config.token
}

wechat.prototype.auth = auth
const wechatApp = new wechat(config) 

module.exports = wechatApp