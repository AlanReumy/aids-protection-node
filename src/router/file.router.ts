import Router from 'koa-router'
import { verifyAuth, verifyAdmin } from '../middleware/auth.middleware'
import fileController from '../controller/file.controller'
import { avatarHandler, pictureHandler } from '../middleware/file.middleware'

const { updateUserAvatar, uploadPicture } = fileController

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

export default fileRouter
