import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import exchangeItemController from '../controller/exchangeItem.controller'

const { create, exchange, list } = exchangeItemController

const exchangeItemRouter = new Router({ prefix: '/exchangeItem' })

exchangeItemRouter.post('/', verifyAuth, verifyAdmin, create)
exchangeItemRouter.get('/', list)
exchangeItemRouter.patch('/:id', verifyAuth, exchange)

export default exchangeItemRouter
