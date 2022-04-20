const Router = require('koa-router')
const {
    avatarHandler,
    pictureHandler
} = require('../middleware/file.middleware')
const {
    updateUserAvatar,
    uploadPicture
} = require('../controller/file.controller')
const { verifyAuth, verifyAdmin } = require('../middleware/auth.middleware')

const fileRouter = new Router({ prefix: '/upload' })

// 上传用户头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, updateUserAvatar)
// 上传图片
fileRouter.post(
    '/picture',
    verifyAuth,
    verifyAdmin,
    pictureHandler,
    uploadPicture
)

module.exports = fileRouter
