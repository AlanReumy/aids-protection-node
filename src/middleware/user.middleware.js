const userService = require('../service/user.service')
const { USER_ALREADY_EXISTS } = require('../constant/error-types')

async function isExistsUser(ctx, next) {
    const { username } = ctx.request.body
    const isExists = await userService.getUserByUsername(username)
    if (!isExists) {
        await next()
    } else {
        const error = new Error(USER_ALREADY_EXISTS)
        ctx.app.emit('error', error, ctx)
    }
}

module.exports = { isExistsUser }
