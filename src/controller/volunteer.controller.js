const volunteerService = require('../service/volunteer.service')
const userService = require('../service/user.service')
const { DOES_NOT_VOLUNTEER } = require('../constant/error-types')

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

    async ask(ctx) {
        const { id: userId } = ctx.user
        const { id } = ctx.params
        const { dataValues } = await userService.getUserById(id)
        if (!dataValues.isVolunteer) {
            const error = new Error(DOES_NOT_VOLUNTEER)
            return ctx.app.emit('error', error, ctx)
        }
        ctx.body = await volunteerService.ask(userId, id)
    }
}

module.exports = new VolunteerController()
