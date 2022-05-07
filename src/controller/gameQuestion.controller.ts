import { Context } from 'koa'

const gameQuestionService = require('../service/gameQuestion.service')

class GameQuestionController {
  async create(ctx: Context) {
    const { question, answerA, answerB, answerC, answerD, rightAnswer } =
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

  async remove(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await gameQuestionService.remove(id)
  }
}

export default new GameQuestionController()
