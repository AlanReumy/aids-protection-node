const db = require('../model/index')
const gameQuestionService = require('./gameQuestion.service')
const Sequelize = require('sequelize')

class KnowledgeGameService {
    async create(name, questionNum, personNum) {
        const {
            dataValues: { id: knowledgeGameId }
        } = await db.knowledgeGame.create({
            name,
            questionNum,
            personNum
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

    async remove(id) {
        await db.knowledgeGame_gameQuestion.destroy({
            where: { knowledgeGameId: id }
        })
        return await db.knowledgeGame.destroy({ where: { id } })
    }

    async detail(id) {
        const questionIds = await db.knowledgeGame_gameQuestion.findAll({
            where: { knowledgeGameId: id }
        })
        const questionArr = []
        for (const item of questionIds) {
            const q = await db.gameQuestion.findOne({
                where: { id: item.dataValues.id }
            })
            questionArr.push(q)
        }
        return questionArr
    }
}

module.exports = new KnowledgeGameService()
