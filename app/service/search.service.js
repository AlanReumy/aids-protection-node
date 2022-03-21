const db = require('../model')
const Router = require('koa-router')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const { success, CODE, fail } = require('../../util/util')

let router = new Router({
    prefix: '/api/search'
})

// 搜索问题接口
router.get('/question', async (ctx) => {
    const { title } = ctx.request.query
    await db.questions
        .findAll({
            where: {
                title: {
                    [Op.like]: '%' + title + '%'
                }
            }
        })
        .then((res) => {
            ctx.body = success(res, '查找成功', CODE.SUCCESS)
        })
        .catch((err) => {
            ctx.body = fail(err, '查找失败', CODE.BUSINESS_ERROR)
        })
})

module.exports = router
