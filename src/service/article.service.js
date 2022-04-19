const db = require('../model/index')

class ArticleService {
    async create(title, content, cover, type) {
        return await db.article.create({ title, content, cover, type })
    }

    async list(offset, limit, type) {
        return await db.article.findAll({ offset, limit, where: { type } })
    }
}

module.exports = new ArticleService()
