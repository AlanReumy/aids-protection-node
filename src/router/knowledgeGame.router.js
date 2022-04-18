const Router = require('koa-router')
const {
    create,
    list,
    oneFinish
} = require('../controller/knowledgeGame.controller')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')

const knowledgeGameRouter = new Router({ prefix: '/knowledgeGame' })

knowledgeGameRouter.post('/', verifyAuth, verifyAdmin, create)
knowledgeGameRouter.get('/', list)
knowledgeGameRouter.patch('/:id', verifyAuth, oneFinish)

module.exports = knowledgeGameRouter
