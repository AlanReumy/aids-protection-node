const Router = require('koa-router')
const { create } = require('../controller/consultant.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const consultantRouter = new Router({ prefix: '/consultant' })

consultantRouter.post('/', verifyAuth, create)

module.exports = consultantRouter
