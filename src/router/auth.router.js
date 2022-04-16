const Router = require('koa-router')
const authRouter = new Router()

const { login, test } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, test)

module.exports = authRouter
