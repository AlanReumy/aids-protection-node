const db = require('../model')
const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const commentController = require('../controller/comment.controller')
const tokenVerify = require('../../util/tokenVerify')

let router = new Router({
    prefix: '/api/comment'
})

let { users } = db

// create
router.post('/create', async (ctx) => {
    const userId = tokenVerify(ctx)
    const { content, answerId } = ctx.request.body
    await commentController
        .create({
            content,
            answerId,
            userId
        })
        .then((res) => {
            ctx.body = success(res, '创建成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
        })
})

// list
router.get('/list', async (ctx) => {
    const { answerId } = ctx.request.query
    await commentController
        .findAllByInclude(users, { answerId })
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
