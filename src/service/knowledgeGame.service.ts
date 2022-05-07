import db from '../model'
import { Sequelize } from 'sequelize'
import gameQuestionService from './gameQuestion.service'

class KnowledgeGameService {
  async create(name: string, questionNum: number, personNum: number) {
    const knowledgeGame = await db.knowledgeGame?.create({
      name,
      questionNum,
      personNum
    })
    const knowledgeGameId = knowledgeGame?.getDataValue('id')
    const questionArr = await gameQuestionService.randomQuestionList(
      questionNum
    )
    for (const item of questionArr || []) {
      if (knowledgeGameId) {
        await db.knowledgeGame_gameQuestion?.create({
          knowledgeGameId,
          gameQuestionId: item.getDataValue('id')
        })
      }
    }

    return questionArr
  }

  async list(offset: number, limit: number) {
    return await db.knowledgeGame?.findAll({ offset, limit })
  }

  async oneFinish(correct: number, wrong: number, id: number) {
    return await db.knowledgeGame?.update(
      { correct, wrong, finishNum: Sequelize.literal('`finishNum` +1') },
      { where: { id } }
    )
  }

  async remove(id: number) {
    await db.knowledgeGame_gameQuestion?.destroy({
      where: { knowledgeGameId: id }
    })
    return await db.knowledgeGame?.destroy({ where: { id } })
  }

  async detail(id: number) {
    const questionIds = await db.knowledgeGame_gameQuestion?.findAll({
      where: { knowledgeGameId: id }
    })
    const questionArr = []
    for (const item of questionIds || []) {
      const q = await db.gameQuestion?.findOne({
        where: { id: item.getDataValue('id') }
      })
      questionArr.push(q)
    }
    return questionArr
  }
}

export default new KnowledgeGameService()
