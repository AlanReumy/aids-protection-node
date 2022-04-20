const db = require('../model/index')

class VolunteerService {
    async create(title, desc, startDate, endDate) {
        return await db.volunteer.create({
            title,
            desc,
            startDate,
            endDate
        })
    }

    async list(offset, limit) {
        return await db.volunteer.findAll({ limit, offset })
    }

    async update(id, title, desc, startDate, endDate) {
        return await db.volunteer.update(
            {
                title,
                desc,
                startDate,
                endDate
            },
            { where: { id } }
        )
    }

    async ask(userId, volunteerId) {
        return await db.volunteerUser.create({ userId, volunteerId })
    }
}

module.exports = new VolunteerService()
