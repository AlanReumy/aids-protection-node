import { Context } from 'vm'

const answerService = require('../service/answer.service')

class AnswerController {
  async create(ctx: Context) {
    const { id: userId } = ctx.user
    const { title, content, questionId } = ctx.request.body

    ctx.body = await answerService.create(title, content, questionId, userId)
  }

  async list(ctx: Context) {
    const { limit, offset, questionId } = ctx.query
    ctx.body = await answerService.list(
      parseInt(offset),
      parseInt(limit),
      parseInt(questionId)
    )
  }
}

export default new AnswerController()
