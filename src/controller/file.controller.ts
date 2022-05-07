import { Context } from 'koa'

const userService = require('../service/user.service')
class FileController {
  async updateUserAvatar(ctx: Context) {
    const { id } = ctx.user
    ctx.body = await userService.updateUserAvatar(
      id,
      ctx.host,
      // @ts-ignore
      ctx.req.file.filename
    )
  }

  async uploadPicture(ctx: Context) {
    // @ts-ignore
    const { filename } = ctx.req.file
    ctx.body = { picture: 'http://' + ctx.host + '/picture/' + filename }
  }
}

export default new FileController()
