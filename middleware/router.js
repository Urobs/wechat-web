const Router = require('koa-router')
const wechat = require('../wechat/wechat')

const router = new Router()
router.get('/', wechat.auth)

module.exports = router