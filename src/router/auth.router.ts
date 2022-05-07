import Router from 'koa-router'
import { verifyLogin, verifyAuth } from '../middleware/auth.middleware'
import authController from '../controller/auth.controller'

const { login, test } = authController
const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, test)

export default authRouter
