import db from '../model'

class AnswerService {
  async create(
    title: string,
    content: string,
    questionId: number,
    userId: number
  ) {
    return await db.answer?.create({ title, content, questionId, userId })
  }

  async list(offset: number, limit: number, questionId: number) {
    return await db.answer?.findAll({
      offset,
      limit,
      where: { questionId }
    })
  }
}

export default new AnswerService()
