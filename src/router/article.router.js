const Router = require('koa-router')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')
const { create, list } = require('../controller/article.controller')

const articleRouter = new Router({ prefix: '/article' })

articleRouter.post('/', verifyAuth, verifyAdmin, create)
articleRouter.get('/', list)

module.exports = articleRouter
