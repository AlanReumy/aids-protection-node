import { Context, Next } from 'koa'

const {
  PARAMETER_MISSING,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIAZTION,
  UNPERMISSION,
  DOES_NOT_DOCTOR
} = require('../constant/error-types')
const { PUBLIC_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')
const md5password = require('../util/password-handle')

// 登录验证用户名密码
async function verifyLogin(ctx: Context, next: Next) {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    const error = new Error(PARAMETER_MISSING)
    return ctx.app.emit('error', error, ctx)
  }
  const result = await userService.getUserByUsername(username)
  const user = result[0]

  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  if (!(md5password(password) === user.dataValues.password)) {
    const error = new Error(PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user.dataValues
  await next()
}

// 验证登录
async function verifyAuth(ctx: Context, next: Next) {
  // 1.获取token
  const authorization = ctx.headers.authorization
  const token = authorization && authorization.replace('Bearer ', '')
  // 2.验证token(id/name/iat/exp)
  try {
    ctx.user = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
    await next()
  } catch (err) {
    console.log(err)
    const error = new Error(UNAUTHORIAZTION)
    ctx.app.emit('error', error, ctx)
  }
}

// 验证管理员权限
async function verifyAdmin(ctx: Context, next: Next) {
  const { isAdmin } = ctx.user
  if (!isAdmin) {
    const error = new Error(UNPERMISSION)
    ctx.app.emit('error', error, ctx)
  } else {
    await next()
  }
}

// 验证医生权限
async function verifyDoctor(ctx: Context, next: Next) {
  const { id: userId } = ctx.user
  const result = await userService.getUserById(userId)
  if (!result.dataValues.isDoctor) {
    const error = new Error(DOES_NOT_DOCTOR)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

export { verifyLogin, verifyAuth, verifyAdmin, verifyDoctor }
