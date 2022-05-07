import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import userController from '../controller/user.controller'

const userRouter = new Router({ prefix: '/user' })
const { create, getUserInfoById, update, beDoctor } = userController

userRouter.post('/', create)
userRouter.get('/:id', getUserInfoById)
// 用户更新个人信息
userRouter.put('/', verifyAuth, update)
// 将用户设置为医生
userRouter.patch('/beDoctor/:id', verifyAuth, verifyAdmin, beDoctor)

export default userRouter
