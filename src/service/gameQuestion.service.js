const db = require('../model/index')
const Sequelize = require('sequelize')

class GameQuestionService {
    async create(question, answerA, answerB, answerC, answerD, rightAnswer) {
        return await db.gameQuestion.create({
            question,
            answerA,
            answerB,
            answerC,
            answerD,
            rightAnswer
        })
    }

    async list(offset, limit) {
        return await db.gameQuestion.findAll({ offset, limit })
    }

    async randomQuestionList(limit) {
        return await db.gameQuestion.findAll({
            order: Sequelize.literal('rand()'),
            limit
        })
    }

    async remove(id) {
        return await db.gameQuestion.destroy({ where: { id } })
    }
}

module.exports = new GameQuestionService()
