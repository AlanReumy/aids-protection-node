import { Context } from 'koa'
import userService from '../service/user.service'
import ErrorTypes from '../constant/error-types'

const md5password = require('../util/password-handle')

class UserController {
  async create(ctx: Context) {
    const { username, password, phone, isAdmin } = ctx.request.body
    // 判断参数
    if (!username || !password || !phone) {
      const error = new Error(ErrorTypes.PARAMETER_MISSING)
      return ctx.app.emit('error', error, ctx)
    }
    // 判断是否注册过
    const result = await userService.getUserByUsername(username)
    const user = result && result[0]
    if (user) {
      const error = new Error(ErrorTypes.USER_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    // 注册
    // TODO：不能返回用户密码
    const res = await userService.create(
      username,
      md5password(password),
      phone,
      isAdmin
    )
    ctx.body = res
  }

  async getUserInfoById(ctx: Context) {
    const { id } = ctx.params
    const res = await userService.getUserById(id)
    // TODO：不能返回用户密码
    ctx.body = res
  }

  async update(ctx: Context) {
    const { id } = ctx.user
    const { username, password, phone, avatar } = ctx.request.body
    ctx.body = await userService.update(username, password, phone, avatar, id)
  }

  async beDoctor(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await userService.beDoctor(id)
  }
}

export default new UserController()
