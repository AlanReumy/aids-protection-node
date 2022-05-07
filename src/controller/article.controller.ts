import { Context } from 'koa'

const articleService = require('../service/article.service')

class ArticleController {
  async create(ctx: Context) {
    const { title, content, cover, type } = ctx.request.body
    ctx.body = await articleService.create(title, content, cover, type)
  }

  async list(ctx: Context) {
    const { offset, limit, type } = ctx.query
    ctx.body = await articleService.list(
      parseInt(offset as string),
      parseInt(limit as string),
      type
    )
  }
}

export default new ArticleController()
