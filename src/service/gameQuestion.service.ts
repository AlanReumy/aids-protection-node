import db from '../model'
import { Sequelize } from 'sequelize'

class GameQuestionService {
  async create(
    question: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    rightAnswer: string
  ) {
    return await db.gameQuestion?.create({
      question,
      answerA,
      answerB,
      answerC,
      answerD,
      rightAnswer
    })
  }

  async list(offset: number, limit: number) {
    return await db.gameQuestion?.findAll({ offset, limit })
  }

  async randomQuestionList(limit: number) {
    return await db.gameQuestion?.findAll({
      order: Sequelize.literal('rand()'),
      limit
    })
  }

  async remove(id: number) {
    return await db.gameQuestion?.destroy({ where: { id } })
  }
}

export default new GameQuestionService()
