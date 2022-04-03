const upload = require('../../util/uploadConfig')
const co = require('co')
const OSS = require('ali-oss')
const fs = require('fs')
const formidable = require('formidable')
const Router = require('koa-router')
// OSS配置
let client = new OSS({
    region: 'oss-cn-chengdu',
    accessKeyId: 'LTAI5tQowphAhqkQjHmHCjcJ',
    accessKeySecret: 'lCZcX6jKw8XZMAUsQqQXQRkIEBQSXU'
})

let ali_oss = {
    bucket: 'codertzm',
    endPoint: 'oss-cn-chengdu.aliyuncs.com',
    cname: true
}
const { success, CODE } = require('../../util/util')
const path = require('path')

let router = new Router({
    prefix: '/api/upload'
})

// 上传图片
router.post('/', upload.single('file'), async (ctx, next) => {
    var key = ctx.req.file.filename
    var localFile =
        path.join(__dirname, '..', '..', '/public', '/images/') + key

    await co(function* () {
        client.useBucket(ali_oss.bucket)
        // client.put上传图片
        var result = yield client.put(key, localFile)
        // 删除本地储存的图片
        fs.unlinkSync(localFile)
    })
    ctx.body = {
        code: 200,
        msg: 'ok',
        filename: 'https://codertzm.oss-cn-chengdu.aliyuncs.com/' + key
    }
})
module.exports = router
