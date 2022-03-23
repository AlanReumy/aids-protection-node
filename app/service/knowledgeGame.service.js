const db = require('../model')
const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const knowledgeGameController = require('../controller/knowledgeGame.controller')

let router = new Router({
    prefix: '/api/knowledgeGame'
})

// create
router.post('/create', async (ctx) => {
    let payload = ctx.request.body
    const { name, personNum } = payload
    await knowledgeGameController
        .create({
            name,
            personNum
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
    await knowledgeGameController
        .findAll()
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

// finish
router.post('/finish', async (ctx) => {
    let { id, correct, wrong } = ctx.request.body
    const item = await knowledgeGameController.findOne({ id })
    item.dataValues.finishNum += 1
    await knowledgeGameController
        .update(id, {
            correct,
            wrong,
            finishNum: item.dataValues.finishNum
        })
        .then((res) => {
            ctx.body = success(res, '答题成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '答题失败', CODE.BUSINESS_ERROR)
        })
})

router.get('/', async (ctx) => {
    let { id } = ctx.request.query
    await knowledgeGameController
        .findOne({ id })
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
