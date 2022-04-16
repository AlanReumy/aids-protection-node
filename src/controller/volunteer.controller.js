const volunteerService = require('../service/volunteer.service')

class VolunteerController {
    async create(ctx) {
        const { title, desc, startDate, endDate } = ctx.request.body
        ctx.body = await volunteerService.create(
            title,
            desc,
            startDate,
            endDate
        )
    }

    async list(ctx) {
        const { offset, limit } = ctx.query
        ctx.body = await volunteerService.list(
            parseInt(offset),
            parseInt(limit)
        )
    }

    async update(ctx) {
        const { id } = ctx.params
        const { title, desc, startDate, endDate } = ctx.request.body
        ctx.body = await volunteerService.update(
            id,
            title,
            desc,
            startDate,
            endDate
        )
    }
}

module.exports = new VolunteerController()
