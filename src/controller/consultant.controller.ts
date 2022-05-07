import { Context } from 'koa'
import consultantService from '../service/consultant.service'

class ConsultantController {
  async create(ctx: Context) {
    const { age, sex, symptom, cQuestion, cAnswer } = ctx.request.body
    const { id: userId } = ctx.user
    ctx.body = await consultantService.create(
      age,
      sex,
      symptom,
      cQuestion,
      cAnswer,
      userId
    )
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    const { id: userId } = ctx.user
    ctx.body = await consultantService.list(
      parseInt(offset as string),
      parseInt(limit as string),
      userId
    )
  }

  async reply(ctx: Context) {
    const { id } = ctx.params
    const { cAnswer } = ctx.request.body
    ctx.body = await consultantService.reply(cAnswer, id)
  }
}

export default new ConsultantController()
