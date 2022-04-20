const knowledgeGameService = require('../service/knowledgeGame.service')

class KnowledgeGameController {
    async create(ctx) {
        const { name, questionNum, personNum } = ctx.request.body
        ctx.body = await knowledgeGameService.create(
            name,
            questionNum,
            personNum
        )
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        ctx.body = await knowledgeGameService.list(
            parseInt(offset),
            parseInt(limit)
        )
    }

    async oneFinish(ctx) {
        const { id } = ctx.params
        const { correct, wrong } = ctx.request.body
        ctx.body = await knowledgeGameService.oneFinish(correct, wrong, id)
    }

    async remove(ctx) {
        const { id } = ctx.params
        ctx.body = await knowledgeGameService.remove(id)
    }

    async detail(ctx) {
        const { id } = ctx.params
        ctx.body = await knowledgeGameService.detail(id)
    }
}

module.exports = new KnowledgeGameController()
