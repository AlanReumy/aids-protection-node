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
}

module.exports = new ConsultantService()
