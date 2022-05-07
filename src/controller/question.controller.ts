import { Context } from 'koa'

const questionService = require('../service/question.service')

class QuestionController {
  async create(ctx: Context) {
    const { title, desc } = ctx.request.body
    const { id: userId } = ctx.user
    ctx.body = await questionService.create(userId, title, desc)
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    ctx.body = await questionService.list(
      parseInt(offset as string),
      parseInt(limit as string)
    )
  }
}

export default new QuestionController()
