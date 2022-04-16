const userService = require('../service/user.service')
const {
    PARAMETER_MISSING,
    USER_ALREADY_EXISTS
} = require('../constant/error-types')
const md5password = require('../util/password-handle')

class UserController {
    async create(ctx) {
        const { username, password, phone } = ctx.request.body
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
            phone
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
}

module.exports = new UserController()
