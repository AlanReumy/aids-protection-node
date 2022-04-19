const articleService = require('../service/article.service')

class ArticleController {
    async create(ctx) {
        const { title, content, cover, type } = ctx.request.body
        ctx.body = await articleService.create(title, content, cover, type)
    }

    async list(ctx) {
        const { offset, limit, type } = ctx.query
        ctx.body = await articleService.list(
            parseInt(offset),
            parseInt(limit),
            type
        )
    }
}

module.exports = new ArticleController()
