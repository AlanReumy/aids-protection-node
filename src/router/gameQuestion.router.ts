import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import gameQuestionController from '../controller/gameQuestion.controller'

const { create, list, remove } = gameQuestionController
const gameQuestionRouter = new Router({ prefix: '/gameQuestion' })

gameQuestionRouter.post('/', verifyAuth, verifyAdmin, create)
gameQuestionRouter.get('/', list)
gameQuestionRouter.delete('/:id', verifyAuth, verifyAdmin, remove)

export default gameQuestionRouter
