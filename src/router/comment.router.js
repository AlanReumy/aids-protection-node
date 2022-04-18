const Router = require('koa-router')

const { create, list } = require('../controller/comment.controller.js')
const { verifyAuth } = require('../middleware/auth.middleware')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.get('/', list)

module.exports = commentRouter
