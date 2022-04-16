const { PRIVATE_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')

class AuthController {
    async login(ctx) {
        const { id, username } = ctx.user
        const token = jwt.sign({ id, username }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            username,
            token
        }
    }

    async test(ctx) {
        ctx.body = '授权成功'
    }
}

module.exports = new AuthController()
