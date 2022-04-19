const consultantService = require('../service/consultant.service')

class ConsultantController {
    async create(ctx) {
        const { age, sex, symptom, cQuestion, cAnswer } = ctx.request.body
        const { id: userId } = ctx.user
        ctx.body = await consultantService.create(
            age,
            sex,
            symptom,
            cQuestion,
            cAnswer,
            userId
        )
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        const { id: userId } = ctx.user
        ctx.body = await consultantService.list(
            parseInt(offset),
            parseInt(limit),
            userId
        )
    }

    async reply(ctx) {
        const { id } = ctx.params
        const { cAnswer } = ctx.request.body
        ctx.body = await consultantService.reply(cAnswer, id)
    }
}

module.exports = new ConsultantController()
