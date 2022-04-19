const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

const {
    create,
    getUserInfoById,
    update,
    beVolunteer,
    beDoctor
} = require('../controller/user.controller')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')

userRouter.post('/', create)
userRouter.get('/:id', getUserInfoById)
// 用户更新个人信息
userRouter.put('/', verifyAuth, update)
// 将用户设置为志愿者
userRouter.patch('/beVolunteer/:id', verifyAuth, verifyAdmin, beVolunteer)
// 将用户设置为医生
userRouter.patch('/beDoctor/:id', verifyAuth, verifyAdmin, beDoctor)

module.exports = userRouter
