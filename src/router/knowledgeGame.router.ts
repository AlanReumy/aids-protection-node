import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import knowledgeGameController from '../controller/knowledgeGame.controller'

const { create, list, oneFinish, remove, detail } = knowledgeGameController
const knowledgeGameRouter = new Router({ prefix: '/knowledgeGame' })

knowledgeGameRouter.post('/', verifyAuth, verifyAdmin, create)
knowledgeGameRouter.get('/', list)
knowledgeGameRouter.patch('/:id', verifyAuth, oneFinish)
knowledgeGameRouter.delete('/:id', verifyAuth, verifyAdmin, remove)
knowledgeGameRouter.get('/:id', detail)

export default knowledgeGameRouter
