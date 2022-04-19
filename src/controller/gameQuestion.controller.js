const gameQuestionService = require('../service/gameQuestion.service')

class GameQuestionController {
    async create(ctx) {
        const { question, answerA, answerB, answerC, answerD, rightAnswer } =
            ctx.request.body
        ctx.body = await gameQuestionService.create(
            question,
            answerA,
            answerB,
            answerC,
            answerD,
            rightAnswer
        )
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        ctx.body = await gameQuestionService.list(
            parseInt(offset),
            parseInt(limit)
        )
    }

    async remove(ctx) {
        const { id } = ctx.params
        ctx.body = await gameQuestionService.remove(id)
    }
}

module.exports = new GameQuestionController()
