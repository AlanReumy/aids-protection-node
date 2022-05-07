import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import articleController from '../controller/article.controller'

const { create, list } = articleController
const articleRouter = new Router({ prefix: '/article' })

articleRouter.post('/', verifyAuth, verifyAdmin, create)
articleRouter.get('/', list)

export default articleRouter
