import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import { Answer } from '../model/types'
import answerService from '../service/answer.service'

class AnswerController {
  async create(ctx: AuthContext) {
    const { id: userId } = ctx.user!
    const { title, content, questionId }: Answer = ctx.request.body

    ctx.body = await answerService.create(title, content, questionId, userId)
  }

  async list(ctx: Context) {
    const { limit, offset, questionId } = ctx.query
    ctx.body = await answerService.list(
      parseInt(offset as string),
      parseInt(limit as string),
      parseInt(questionId as string)
    )
  }
}

export default new AnswerController()
