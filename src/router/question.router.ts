import Router from 'koa-router'
import { verifyAuth } from '../middleware/auth.middleware'
import questionController from '../controller/question.controller'

const questionRouter = new Router({ prefix: '/question' })

const { create, list } = questionController

questionRouter.post('/', verifyAuth, create)
questionRouter.get('/', list)

export default questionRouter
