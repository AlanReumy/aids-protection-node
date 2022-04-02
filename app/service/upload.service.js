const Router = require('koa-router')
const { success, CODE } = require('../../util/util')

let router = new Router({
    prefix: '/api/upload'
})

// 上传图片
router.post('/', async (ctx) => {
    ctx.body = success(ctx.request.files.file.path, '上传成功', CODE.SUCCESS)
})

module.exports = router
