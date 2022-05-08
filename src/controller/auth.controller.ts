import { Context } from 'koa'
import { PRIVATE_KEY } from '../app/config'
import jwt from 'jsonwebtoken'
import { User } from '../model/types'

class AuthController {
  async login(ctx: Context) {
    const { id, username, isAdmin }: User = ctx.user
    const token = jwt.sign({ id, username, isAdmin }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      username,
      token
    }
  }

  async test(ctx: Context) {
    ctx.body = '授权成功'
  }
}
export default new AuthController()
