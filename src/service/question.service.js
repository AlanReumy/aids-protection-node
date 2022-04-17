const db = require('../model/index')

class QuestionService {
    constructor(model) {
        this.model = model
    }

    async create(userId, title, desc) {
        return await this.model.create({ userId, title, desc })
    }

    async list(offset, limit) {
        return await this.model.findAll({ limit, offset })
    }
}

module.exports = new QuestionService(db.question)
