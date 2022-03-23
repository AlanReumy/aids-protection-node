const Router = require('koa-router')
const { success, CODE, fail } = require('../../util/util')
const exchangeItemController = require('../controller/exchangeItem.controller')
const userController = require('../controller/user.controller')

let router = new Router({
    prefix: '/api/exchangeItem'
})

// create
router.post('/create', async (ctx) => {
    const { name, integral, img } = ctx.request.body
    await exchangeItemController
        .create({
            name,
            img,
            integral
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
    const { id, userId } = ctx.request.body
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
            if (res <= 0) {
                throw new Error('error')
            }
            return await userController.update(userId, {
                integral:
                    user.dataValues.integral - exchangeItem.dataValues.integral
            })
        })
        .then((res) => {
            ctx.body = success(res, '兑换成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '积分不足，兑换失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
