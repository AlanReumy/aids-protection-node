import db from '../model'

class ConsultantService {
  async create(
    age: number,
    sex: number,
    symptom: string,
    cQuestion: string,
    cAnswer: string,
    userId: number
  ) {
    return await db.consultant?.create({
      age,
      sex,
      symptom,
      cQuestion,
      cAnswer,
      userId
    })
  }

  async list(offset: number, limit: number, userId: number) {
    return await db.consultant?.findAll({
      offset,
      limit,
      where: { userId }
    })
  }

  async reply(cAnswer: string, id: number) {
    return await db.consultant?.update(
      { cAnswer, haveReplies: true },
      { where: { id: id } }
    )
  }
}

export default new ConsultantService()
