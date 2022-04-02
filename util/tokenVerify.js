const jsonwebtoken = require('jsonwebtoken')
const { SECRET } = require('../app')

// 根据token解析用户id
const tokenVerify = (ctx) => {
    const { authorization } = ctx.header
    const { id } = jsonwebtoken.verify(authorization.substring(7), SECRET)
    return id
}

module.exports = tokenVerify
