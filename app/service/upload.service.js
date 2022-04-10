const upload = require('../../util/uploadConfig')
const Router = require('koa-router')
const { success, CODE } = require('../../util/util')
const formatUpload = require('../../util/formatUpload')

let router = new Router({
    prefix: '/api/upload'
})

// 上传图片
router.post('/avatar', upload.single('avatar'), async (ctx, next) => {
    ctx.body = success(formatUpload(ctx), '上传图片成功', CODE.SUCCESS)
})

router.post('/images', upload.single('images'), async (ctx, next) => {
    ctx.body = success(formatUpload(ctx), '上传图片成功', CODE.SUCCESS)
})
module.exports = router
