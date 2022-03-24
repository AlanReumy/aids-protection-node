const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const consultantController = require('../controller/consultant.controller')

let router = new Router({
    prefix: '/api/consultant'
})

// create
router.post('/create', async (ctx) => {
    const { cQuestion, userId, sex, age, symptom } = ctx.request.body
    await consultantController
        .create({
            cQuestion,
            userId,
            sex,
            age,
            symptom
        })
        .then((res) => {
            ctx.body = success(res, '创建成功', CODE.SUCCESS)
        })
        .catch((err) => {
            console.log(err)
            ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
        })
})

router.get('/list', async (ctx) => {
    const { userId } = ctx.request.query
    await consultantController
        .findAll({ userId })
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

// update
router.post('/update', async (ctx) => {
    const { id, cAnswer } = ctx.request.body
    await consultantController
        .update(id, { cAnswer, haveReplies: true })
        .then((res) => {
            ctx.body = success(res, '更新成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '更新失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
