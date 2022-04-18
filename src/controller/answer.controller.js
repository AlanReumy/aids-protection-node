const answerService = require('../service/answer.service')

class AnswerController {
    async create(ctx) {
        const { id: userId } = ctx.user
        const { title, content, questionId } = ctx.request.body

        ctx.body = await answerService.create(
            title,
            content,
            questionId,
            userId
        )
    }

    async list(ctx) {
        const { limit, offset, questionId } = ctx.query
        ctx.body = await answerService.list(
            parseInt(offset),
            parseInt(limit),
            parseInt(questionId)
        )
    }
}

module.exports = new AnswerController()
