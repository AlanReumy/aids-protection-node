const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

const { create, getUserInfoById } = require('../controller/user.controller')

userRouter.post('/', create)
userRouter.get('/:id', getUserInfoById)

module.exports = userRouter
