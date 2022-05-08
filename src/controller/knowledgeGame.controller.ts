import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import { KnowLedgeGame } from '../model/types'
import knowledgeGameService from '../service/knowledgeGame.service'

class KnowledgeGameController {
  async create(ctx: AuthContext) {
    const { name, questionNum, personNum }: KnowLedgeGame = ctx.request.body
    ctx.body = await knowledgeGameService.create(name, questionNum, personNum)
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    ctx.body = await knowledgeGameService.list(
      parseInt(offset as string),
      parseInt(limit as string)
    )
  }

  async oneFinish(ctx: AuthContext) {
    const { id }: { id: number } = ctx.params
    const { correct, wrong }: KnowLedgeGame = ctx.request.body
    ctx.body = await knowledgeGameService.oneFinish(correct, wrong, id)
  }

  async remove(ctx: AuthContext) {
    const { id }: { id: number } = ctx.params
    ctx.body = await knowledgeGameService.remove(id)
  }

  async detail(ctx: Context) {
    const { id }: { id: number } = ctx.params
    ctx.body = await knowledgeGameService.detail(id)
  }
}

export default new KnowledgeGameController()
