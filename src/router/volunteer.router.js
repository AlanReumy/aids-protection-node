const Router = require('koa-router')
const {
    create,
    list,
    update,
    ask
} = require('../controller/volunteer.controller')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')

const volunteerRouter = new Router({ prefix: '/volunteer' })

volunteerRouter.post('/', verifyAuth, verifyAdmin, create)
volunteerRouter.get('/', list)
volunteerRouter.patch('/:id', verifyAuth, ask)
volunteerRouter.put('/:id', verifyAuth, update)

module.exports = volunteerRouter
