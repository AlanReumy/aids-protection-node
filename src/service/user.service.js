const db = require('../model/index')

class UserService {
    async create(username, password, phone, isAdmin) {
        if (!isAdmin) {
            return await db.user.create({ username, password, phone })
        } else {
            return await db.user.create({
                username,
                password,
                phone,
                isAdmin
            })
        }
    }

    async getUserByUsername(username) {
        return await db.user.findAll({ where: { username } })
    }

    async getUserById(id) {
        return await db.user.findOne({ where: { id } })
    }

    async changeUserCount(id, points, type) {
        const user = await db.user.findOne({ where: { id } })
        await user[type](['points'], { by: points })
    }
}

module.exports = new UserService()
