import Router from 'koa-router'
import { verifyLogin, verifyAuth } from '../middleware/auth.middleware'
import authController from '../controller/auth.controller'

const authRouter = new Router()
const { login, test } = authController

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, test)

export default authRouter
