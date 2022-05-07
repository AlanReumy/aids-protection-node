import { Context } from 'koa'

const knowledgeGameService = require('../service/knowledgeGame.service')

class KnowledgeGameController {
  async create(ctx: Context) {
    const { name, questionNum, personNum } = ctx.request.body
    ctx.body = await knowledgeGameService.create(name, questionNum, personNum)
  }

  async list(ctx: Context) {
    const { offset, limit } = ctx.query
    ctx.body = await knowledgeGameService.list(
      parseInt(offset as string),
      parseInt(limit as string)
    )
  }

  async oneFinish(ctx: Context) {
    const { id } = ctx.params
    const { correct, wrong } = ctx.request.body
    ctx.body = await knowledgeGameService.oneFinish(correct, wrong, id)
  }

  async remove(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await knowledgeGameService.remove(id)
  }

  async detail(ctx: Context) {
    const { id } = ctx.params
    ctx.body = await knowledgeGameService.detail(id)
  }
}

export default new KnowledgeGameController()
