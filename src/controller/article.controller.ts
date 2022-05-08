import { Context } from 'koa'
import { AuthContext } from '../middleware/auth.middleware'
import { Article } from '../model/types'
import articleService from '../service/article.service'

class ArticleController {
  async create(ctx: AuthContext) {
    const { title, content, cover, type }: Article = ctx.request.body
    ctx.body = await articleService.create(title, content, cover, type)
  }

  async list(ctx: Context) {
    const { offset, limit, type } = ctx.query
    ctx.body = await articleService.list(
      parseInt(offset as string),
      parseInt(limit as string),
      parseInt(type as string)
    )
  }
}

export default new ArticleController()
