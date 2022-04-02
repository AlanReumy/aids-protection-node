const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const exchangeItemController = require('../controller/exchangeItem.controller')
const userController = require('../controller/user.controller')
const tokenVerify = require('../../util/tokenVerify')

let router = new Router({
    prefix: '/api/exchangeItem'
})

// create
router.post('/create', async (ctx) => {
    const { name, integral, img, count } = ctx.request.body
    await exchangeItemController
        .create({
            name,
            img,
            integral,
            count
        })
        .then((res) => {
            ctx.body = success(res, '创建成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '创建失败', CODE.BUSINESS_ERROR)
        })
})

// update
router.post('/exchange', async (ctx) => {
    const userId = tokenVerify(ctx)
    const { id } = ctx.request.body
    let exchangeItem
    await exchangeItemController
        .findOne({ id })
        .then(async (item) => {
            exchangeItem = item
            return await userController.findOne({ id: userId })
        })
        .then(async (user) => {
            let res =
                user.dataValues.integral - exchangeItem.dataValues.integral
            if (res < 0) {
                throw new Error('error')
            }
            // 减少用户积分
            return await userController.update(userId, {
                integral:
                    user.dataValues.integral - exchangeItem.dataValues.integral
            })
        })
        .then(async (res) => {
            // 减少数量
            return await exchangeItemController.update(id, {
                count: --exchangeItem.dataValues.count
            })
        })
        .then((res) => {
            ctx.body = success(res, '兑换成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '积分不足，兑换失败', CODE.BUSINESS_ERROR)
        })
})

// list
router.get('/list', async (ctx) => {
    await exchangeItemController
        .findAll()
        .then((res) => {
            ctx.body = success(res, '查询成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查询失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
