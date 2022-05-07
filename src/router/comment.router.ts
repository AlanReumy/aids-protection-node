import Router from 'koa-router'
import commentController from '../controller/comment.controller'
import { verifyAuth } from '../middleware/auth.middleware'

const { create, list } = commentController
const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/', verifyAuth, create)
commentRouter.get('/', list)

export default commentRouter
