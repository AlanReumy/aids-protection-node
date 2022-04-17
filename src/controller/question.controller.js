const questionService = require('../service/question.service')

class QuestionController {
    async create(ctx) {
        const { title, desc } = ctx.request.body
        const { id: userId } = ctx.user
        ctx.body = await questionService.create(userId, title, desc)
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        ctx.body = await questionService.list(parseInt(offset), parseInt(limit))
    }
}

module.exports = new QuestionController()
