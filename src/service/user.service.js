const db = require('../model/index')

class UserService {
    constructor(model) {
        this.model = model
    }

    async create(username, password, phone) {
        return await this.model.create({ username, password, phone })
    }

    async getUserByUsername(username) {
        return await this.model.findAll({ where: { username } })
    }

    async getUserById(id) {
        return await this.model.findOne({ where: { id } })
    }
}

module.exports = new UserService(db.user)
