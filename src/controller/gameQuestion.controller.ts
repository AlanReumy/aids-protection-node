import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import { GameQuestion } from '../model/types'
import gameQuestionService from '../service/gameQuestion.service'

class GameQuestionController {
  async create(ctx: AuthContext) {
    const { question, answerA, answerB, answerC, answerD, rightAnswer }: GameQuestion =
      ctx.request.body
    ctx.body = await gameQuestionService.create(
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      rightAnswer
    )
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    ctx.body = await gameQuestionService.list(
      parseInt(offset as string),
      parseInt(limit as string)
    )
  }

  async remove(ctx: AuthContext) {
    const { id }: { id: number } = ctx.params
    ctx.body = await gameQuestionService.remove(id)
  }
}

export default new GameQuestionController()
