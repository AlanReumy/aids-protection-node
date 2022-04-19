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

    async update(username, password, phone, avatar, id) {
        return await db.user.update(
            { username, password, phone, avatar },
            { where: { id } }
        )
    }

    async beVolunteer(id) {
        return await db.user.update({ isVolunteer: true }, { where: { id } })
    }

    async beDoctor(id) {
        return await db.user.update({ isDoctor: true }, { where: { id } })
    }
}

module.exports = new UserService()
