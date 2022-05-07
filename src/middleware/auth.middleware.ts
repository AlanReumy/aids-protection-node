import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import { User } from '../model/types'
import { PUBLIC_KEY } from '../app/config'
import userService from '../service/user.service'
import md5password from '../util/password-handle'
import ErrorTypes from '../constant/error-types'


// 登录验证用户名密码
async function verifyLogin(ctx: Context, next: Next) {
  const { username, password }: User = ctx.request.body
  if (!username || !password) {
    const error = new Error(ErrorTypes.PARAMETER_MISSING)
    return ctx.app.emit('error', error, ctx)
  }
  const result = await userService.getUserByUsername(username)
  const user = result && result[0]

  if (!user) {
    const error = new Error(ErrorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  if (!(md5password(password) === user.getDataValue('password'))) {
    const error = new Error(ErrorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = {
    id: user.getDataValue('id'),
    username: user.getDataValue('username'),
    password: user.getDataValue('password'),
    isAdmin: user.getDataValue('isAdmin'),
    isDoctor: user.getDataValue('isDoctor'),
    points: user.getDataValue('points'),
    avatar: user.getDataValue('avatar')
  }

  await next()
}

// 验证登录
async function verifyAuth(ctx: Context, next: Next) {
  // 1.获取token
  const authorization = ctx.headers.authorization
  const token = authorization && authorization.replace('Bearer ', '')
  // 2.验证token(id/name/iat/exp)
  try {
    ctx.user = jwt.verify(token || '', PUBLIC_KEY, { algorithms: ['RS256'] })
    await next()
  } catch (err) {
    console.log(err)
    const error = new Error(ErrorTypes.UNAUTHORIAZTION)
    ctx.app.emit('error', error, ctx)
  }
}

// 验证管理员权限
async function verifyAdmin(ctx: Context, next: Next) {
  const { isAdmin } = ctx.user
  if (!isAdmin) {
    const error = new Error(ErrorTypes.UNPERMISSION)
    ctx.app.emit('error', error, ctx)
  } else {
    await next()
  }
}

// 验证医生权限
async function verifyDoctor(ctx: Context, next: Next) {
  const { id: userId } = ctx.user
  const result = await userService.getUserById(userId)
  if (!result?.getDataValue('isDoctor')) {
    const error = new Error(ErrorTypes.DOES_NOT_DOCTOR)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

export { verifyLogin, verifyAuth, verifyAdmin, verifyDoctor }
