import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import commentService from '../service/comment.service'

class CommentController {
  async create(ctx: AuthContext) {
    const { id: userId } = ctx.user!
    const { content, answerId } = ctx.request.body
    ctx.body = await commentService.create(content, answerId, userId)
  }

  async list(ctx: Context) {
    const { limit, offset, answerId } = ctx.query
    ctx.body = await commentService.list(
      parseInt(limit as string),
      parseInt(offset as string),
      parseInt(answerId as string)
    )
  }
}

export default new CommentController()
