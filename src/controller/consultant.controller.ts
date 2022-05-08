import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import { Consultant } from '../model/types'
import consultantService from '../service/consultant.service'

class ConsultantController {
  async create(ctx: AuthContext) {
    const { age, sex, symptom, cQuestion, cAnswer }: Consultant = ctx.request.body
    const { id: userId } = ctx.user!
    ctx.body = await consultantService.create(
      age,
      sex,
      symptom,
      cQuestion,
      cAnswer,
      userId
    )
  }

  async list(ctx: AuthContext) {
    const { offset, limit } = ctx.query
    const { id: userId } = ctx.user!
    ctx.body = await consultantService.list(
      parseInt(offset as string),
      parseInt(limit as string),
      userId
    )
  }

  async reply(ctx: AuthContext) {
    const { id } = ctx.params
    const { cAnswer } = ctx.request.body
    ctx.body = await consultantService.reply(cAnswer, id)
  }
}

export default new ConsultantController()
