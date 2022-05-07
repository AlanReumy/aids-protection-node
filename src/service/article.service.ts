import db from '../model'

class ArticleService {
  async create(title: string, content: string, cover: string, type: number) {
    return await db.article?.create({ title, content, cover, type })
  }

  async list(offset: number, limit: number, type: number) {
    return await db.article?.findAll({ offset, limit, where: { type } })
  }
}

export default new ArticleService()
