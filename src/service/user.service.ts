import db from '../model'

class UserService {
  async create(
    username: string,
    password: string,
    phone: number,
    isAdmin: boolean
  ) {
    if (!isAdmin) {
      return await db.user?.create({ username, password, phone })
    } else {
      return await db.user?.create({
        username,
        password,
        phone,
        isAdmin
      })
    }
  }

  async getUserByUsername(username: string) {
    return await db.user?.findAll({ where: { username } })
  }

  async getUserById(id: number) {
    return await db.user?.findOne({ where: { id } })
  }

  async changeUserCount(
    id: number,
    points: number,
    type: 'increment' | 'decrement'
  ) {
    const user = await db.user?.findOne({ where: { id } })
    user && (await user[type](['points'], { by: points }))
  }

  async update(
    username: string,
    password: string,
    phone: number,
    avatar: string,
    id: number
  ) {
    return await db.user?.update(
      { username, password, phone, avatar },
      { where: { id } }
    )
  }

  async beDoctor(id: number) {
    return await db.user?.update({ isDoctor: true }, { where: { id } })
  }

  async updateUserAvatar(id: number, host: string, filename: string) {
    const avatar = 'http://' + host + '/avatar/' + filename
    await db.user?.update({ avatar }, { where: { id } })
    return { avatar }
  }
}

export default new UserService()
