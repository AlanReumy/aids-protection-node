const Router = require('koa-router')
const {
    create,
    list,
    oneFinish
} = require('../controller/knowledgeGame.controller')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')

const knowledgeGameRouter = new Router({ prefix: '/knowledgeGame' })

knowledgeGameRouter.post('/', verifyAuth, verifyPermission, create)
knowledgeGameRouter.get('/', list)
knowledgeGameRouter.patch('/:id', verifyAuth, oneFinish)

module.exports = knowledgeGameRouter
