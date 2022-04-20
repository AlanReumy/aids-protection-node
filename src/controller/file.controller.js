const userService = require('../service/user.service')
class FileController {
    async updateUserAvatar(ctx) {
        const { id } = ctx.user
        ctx.body = await userService.updateUserAvatar(
            id,
            ctx.host,
            ctx.req.file.filename
        )
    }

    async uploadPicture(ctx) {
        const { filename } = ctx.req.file
        ctx.body = { picture: 'http://' + ctx.host + '/picture/' + filename }
    }
}

module.exports = new FileController()
