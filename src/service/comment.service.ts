import db from '../model'

class CommentService {
  async create(content: string, answerId: number, userId: number) {
    return await db.comment?.create({ content, answerId, userId })
  }

  async list(limit: number, offset: number, answerId: number) {
    return await db.comment?.findAll({ limit, offset, where: { answerId } })
  }
}

export default new CommentService()
