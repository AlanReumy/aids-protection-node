import { Context } from 'vm'

const commentService = require('../service/comment.service')

class CommentController {
  async create(ctx: Context) {
    const { id: userId } = ctx.user
    const { content, answerId } = ctx.request.body
    ctx.body = await commentService.create(content, answerId, userId)
  }

  async list(ctx: Context) {
    const { limit, offset, answerId } = ctx.query
    ctx.body = await commentService.list(
      parseInt(limit),
      parseInt(offset),
      answerId
    )
  }
}

export default new CommentController()
