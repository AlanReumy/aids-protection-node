const Router = require('koa-router')
const { create, list } = require('../controller/answer.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

const answerRouter = new Router({ prefix: '/answer' })

answerRouter.post('/', verifyAuth, create)
answerRouter.get('/', list)

module.exports = answerRouter
