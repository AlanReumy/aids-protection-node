const db = require('../model')
const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const knowledgeGameController = require('../controller/knowledgeGame.controller')
const userController = require('../controller/user.controller')

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
            personNum,
            finishNum: 0
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
    let { id, correct, wrong, userId } = ctx.request.body
    const item = await knowledgeGameController.findOne({ id })
    item.dataValues.finishNum += 1
    await knowledgeGameController
        .findOne({ id })
        .then(async (res) => {
            return await knowledgeGameController.update(id, {
                correct:
                    parseInt(
                        res.dataValues.correct === null
                            ? 0
                            : res.dataValues.correct
                    ) + parseInt(correct),
                wrong:
                    parseInt(
                        res.dataValues.wrong === null ? 0 : res.dataValues.wrong
                    ) + parseInt(wrong),
                finishNum: parseInt(res.dataValues.finishNum) + 1
            })
        })
        .then(async (res) => {
            return await userController.findOne({ id: userId })
        })
        .then(async (user) => {
            return await userController.update(userId, {
                integral: user.dataValues.integral + 5
            })
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

// 删除
router.delete('/delete', async (ctx) => {
    let { id } = ctx.request.body
    await knowledgeGameController
        .delete(id)
        .then((res) => {
            ctx.body = success(res, '删除成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '删除失败', CODE.BUSINESS_ERROR)
        })
})

// 更新竞赛
router.post('/update', async (ctx) => {
    let { id, correct, name, personNum, finishNum } = ctx.request.body
    await knowledgeGameController
        .update(id, {
            correct,
            name,
            personNum,
            finishNum
        })
        .then((res) => {
            ctx.body = success(res, '更新成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '更新失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
