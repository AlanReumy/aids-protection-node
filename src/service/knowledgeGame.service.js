const db = require('../model/index')
const gameQuestionService = require('./gameQuestion.service')
const Sequelize = require('sequelize')

class KnowledgeGameService {
    async create(name, questionNum, personNum, finishNum) {
        const {
            dataValues: { id: knowledgeGameId }
        } = await db.knowledgeGame.create({
            name,
            questionNum,
            personNum,
            finishNum
        })
        const questionArr = await gameQuestionService.randomQuestionList(
            questionNum
        )
        for (const item of questionArr) {
            await db.knowledgeGame_gameQuestion.create({
                knowledgeGameId,
                gameQuestionId: item.dataValues.id
            })
        }

        return questionArr
    }

    async list(offset, limit) {
        return await db.knowledgeGame.findAll({ offset, limit })
    }

    async oneFinish(correct, wrong, id) {
        return await db.knowledgeGame.update(
            { correct, wrong, finishNum: Sequelize.literal('`finishNum` +1') },
            { where: { id } }
        )
    }
}

module.exports = new KnowledgeGameService()
