const db = require('../model/index')

class ConsultantService {
    async create(age, sex, symptom, cQuestion, cAnswer, userId) {
        return await db.consultant.create({
            age,
            sex,
            symptom,
            cQuestion,
            cAnswer,
            userId
        })
    }

    async list(offset, limit, userId) {
        return await db.consultant.findAll(
            { offset, limit },
            { where: { userId } }
        )
    }

    async reply(cAnswer, id) {
        return await db.consultant.update(
            { cAnswer, haveReplies: true },
            { where: { id } }
        )
    }
}

module.exports = new ConsultantService()
