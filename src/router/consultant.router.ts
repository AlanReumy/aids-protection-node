import Router from 'koa-router'
import consultantController from '../controller/consultant.controller'
import { verifyAuth, verifyDoctor } from '../middleware/auth.middleware'

const { create, list, reply } = consultantController
const consultantRouter = new Router({ prefix: '/consultant' })

consultantRouter.post('/', verifyAuth, create)
consultantRouter.get('/', verifyAuth, list)
consultantRouter.patch('/:id', verifyAuth, verifyDoctor, reply)

export default consultantRouter
