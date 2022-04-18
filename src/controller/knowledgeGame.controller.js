const { create, list, oneFinish } = require('../service/knowledgeGame.service')

class KnowledgeGameController {
    async create(ctx) {
        const { name, questionNum, personNum, finishNum } = ctx.request.body
        ctx.body = await create(name, questionNum, personNum, finishNum)
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        ctx.body = await list(parseInt(offset), parseInt(limit))
    }

    async oneFinish(ctx) {
        const { id } = ctx.params
        const { correct, wrong } = ctx.request.body
        ctx.body = await oneFinish(correct, wrong, id)
    }
}

module.exports = new KnowledgeGameController()
