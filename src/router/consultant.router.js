const Router = require('koa-router')
const { create, list, reply } = require('../controller/consultant.controller')
const { verifyAuth, verifyDoctor } = require('../middleware/auth.middleware')

const consultantRouter = new Router({ prefix: '/consultant' })

consultantRouter.post('/', verifyAuth, create)
consultantRouter.get('/', verifyAuth, list)
consultantRouter.patch('/:id', verifyAuth, verifyDoctor, reply)

module.exports = consultantRouter
