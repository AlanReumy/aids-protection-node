import db from '../model'

class QuestionService {
  async create(userId: number, title: string, desc: string) {
    return await db.question?.create({ userId, title, desc })
  }

  async list(offset: number, limit: number) {
    return await db.question?.findAll({ limit, offset })
  }
}

export default new QuestionService()
