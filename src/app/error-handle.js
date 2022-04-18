const errorTypes = require('../constant/error-types')
const errorHandler = (error, ctx) => {
    let status, message
    switch (error.message) {
        case errorTypes.PARAMETER_MISSING:
            status = 400
            message = '参数缺失'
            break
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409
            message = '用户名已存在'
            break
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400
            message = '用户不存在'
            break
        case errorTypes.PASSWORD_IS_INCORRECT:
            status = 400
            message = '密码不正确'
            break
        case errorTypes.UNAUTHORIAZTION:
            status = 401
            message = '无效的token'
            break
        case errorTypes.UNPERMISSION:
            status = 401
            message = '你不具备操作权限'
            break
        case errorTypes.DOES_NOT_VOLUNTEER:
            status = 401
            message = '您不是志愿者'
            break
        default:
            status = 404
            message = 'NOT FOUND'
            break
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandler
