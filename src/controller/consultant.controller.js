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
}

module.exports = new ConsultantController()
