const Router = require('koa-router')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')
const {
    create,
    exchange,
    list
} = require('../controller/exchangeItem.controller')

const exchangeItemRouter = new Router({ prefix: '/exchangeItem' })

exchangeItemRouter.post('/', verifyAuth, verifyAdmin, create)
exchangeItemRouter.get('/', list)
exchangeItemRouter.patch('/:id', verifyAuth, exchange)

module.exports = exchangeItemRouter
