const msgHandler = require('./handle_msg')
const Router = require('koa-router')
const test = require('./test')
const wechat = require('../wechat/wechat')

const router = new Router()
router.get('/', wechat.auth)
router.post('/', msgHandler)
router.get('/getAccessToken', test)

module.exports = router