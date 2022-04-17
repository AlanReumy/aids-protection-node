const Router = require('koa-router')

const questionRouter = new Router({ prefix: '/question' })

const { create, list } = require('../controller/question.controller')
const { verifyAuth } = require('../middleware/auth.middleware')

questionRouter.post('/', verifyAuth, create)
questionRouter.get('/', list)

module.exports = questionRouter
