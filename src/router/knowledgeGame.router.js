const Router = require('koa-router')
const {
    create,
    list,
    oneFinish,
    remove
} = require('../controller/knowledgeGame.controller')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')

const knowledgeGameRouter = new Router({ prefix: '/knowledgeGame' })

knowledgeGameRouter.post('/', verifyAuth, verifyAdmin, create)
knowledgeGameRouter.get('/', list)
knowledgeGameRouter.patch('/:id', verifyAuth, oneFinish)
knowledgeGameRouter.delete('/:id', verifyAuth, verifyAdmin, remove)

module.exports = knowledgeGameRouter
