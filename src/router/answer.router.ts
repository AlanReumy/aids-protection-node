import Router from 'koa-router'
import { verifyAuth } from '../middleware/auth.middleware'
import answerController from '../controller/answer.controller'

const { create, list } = answerController

const answerRouter = new Router({ prefix: '/answer' })

answerRouter.post('/', verifyAuth, create)
answerRouter.get('/', list)

export default answerRouter
