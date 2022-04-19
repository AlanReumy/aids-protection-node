const userService = require('../service/user.service')
const {
    PARAMETER_MISSING,
    USER_ALREADY_EXISTS
} = require('../constant/error-types')
const md5password = require('../util/password-handle')

class UserController {
    async create(ctx) {
        const { username, password, phone, isAdmin } = ctx.request.body
        // 判断参数
        if (!username || !password || !phone) {
            const error = new Error(PARAMETER_MISSING)
            return ctx.app.emit('error', error, ctx)
        }
        // 判断是否注册过
        const result = await userService.getUserByUsername(username)
        const user = result[0]
        if (user) {
            const error = new Error(USER_ALREADY_EXISTS)
            return ctx.app.emit('error', error, ctx)
        }
        // 注册
        const { dataValues } = await userService.create(
            username,
            md5password(password),
            phone,
            isAdmin
        )
        delete dataValues.password
        ctx.body = dataValues
    }

    async getUserInfoById(ctx) {
        const { id } = ctx.params
        const { dataValues } = await userService.getUserById(id)
        delete dataValues.password
        ctx.body = dataValues
    }

    async update(ctx) {
        const { id } = ctx.user
        const { username, password, phone, avatar } = ctx.request.body
        ctx.body = await userService.update(
            username,
            password,
            phone,
            avatar,
            id
        )
    }

    async beVolunteer(ctx) {
        const { id } = ctx.params
        ctx.body = await userService.beVolunteer(id)
    }

    async beDoctor(ctx) {
        const { id } = ctx.params
        ctx.body = await userService.beDoctor(id)
    }
}

module.exports = new UserController()
