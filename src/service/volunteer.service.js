const db = require('../model/index')

class VolunteerService {
    constructor(model) {
        this.model = model
    }

    async create(title, desc, startDate, endDate) {
        return await this.model.create({
            title,
            desc,
            startDate,
            endDate
        })
    }

    async list(offset, limit) {
        return await this.model.findAll({ limit, offset })
    }

    async update(id, title, desc, startDate, endDate) {
        console.log(id)
        return await this.model.update({
            title,
            desc,
            startDate,
            endDate
        })
    }
}

module.exports = new VolunteerService(db.volunteer)
