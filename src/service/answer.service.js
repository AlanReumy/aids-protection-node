const db = require('../model/index')

class AnswerService {
    async create(title, content, questionId, userId) {
        return await db.answer.create({ title, content, questionId, userId })
    }

    async list(offset, limit, questionId) {
        return await db.answer.findAll(
            { offset, limit },
            { where: { questionId } }
        )
    }
}

module.exports = new AnswerService()
