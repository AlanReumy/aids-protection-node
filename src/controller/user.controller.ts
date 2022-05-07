import { Context } from 'koa'
import userService from '../service/user.service'
import ErrorTypes from '../constant/error-types'
import { User } from '../model/types'
import md5password from '../util/password-handle'

interface UserParam extends Omit<User, 'phone'> {
  phone: string
}

class UserController {
  async create(ctx: Context) {
    const { username, password, phone, isAdmin }: UserParam = ctx.request.body
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
    const res = await userService.create(
      username,
      md5password(password),
      parseInt(password),
      isAdmin
    )

    ctx.body = {
      id: res?.id,
      username: res?.username,
      isAdmin: res?.isAdmin,
      points: res?.points,
      phone: res?.phone,
      isDoctor: res?.isDoctor,
      isPatient: res?.isPatient
    }
  }

  async getUserInfoById(ctx: Context) {
    const { id }: { id: number } = ctx.params
    const res = await userService.getUserById(id)
    ctx.body = {
      id: res?.id,
      username: res?.username,
      isAdmin: res?.isAdmin,
      points: res?.points,
      phone: res?.phone,
      isDoctor: res?.isDoctor,
      isPatient: res?.isPatient
    }
  }

  async update(ctx: Context) {
    const { id }: { id: number } = ctx.user
    const { username, password, phone, avatar }: UserParam = ctx.request.body
    ctx.body = await userService.update(username, password, parseInt(phone), avatar, id)
  }

  async beDoctor(ctx: Context) {
    const { id }: { id: number } = ctx.params
    ctx.body = await userService.beDoctor(id)
  }
}

export default new UserController()
