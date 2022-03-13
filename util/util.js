/**
 * 通用函数封装
 * @auther 何小玍。
 * @time 2021/07/28 22:07
 */
const log4j = require('./log4j')
const CODE = {
    SUCCESS: 200, // 成功
    PARAM_ERROR: 10001, // 参数错误
    USER_ACCOUNT_ERROR: 20001, // 账号或密码错误
    USER_LOGIN_ERROR: 30001, // 用户未登录
    BUSINESS_ERROR: 40001, // 业务请求失败
    AUTH_ERROR: 50001 // 认证失败或TOKEN过期
}

module.exports = {
    /**
     * 分页结构封装
     * @param { number } pageNum        每页数量
     * @param { number } pageSize       当前页码
     */
    pager({ pageNum = 1, pageSize = 1 }) {
        pageNum *= 1
        pageSize *= 1
        const skipIndex = (pageNum - 1) * pageSize // 当前所翻页数
        return {
            page: {
                pageNum,
                pageSize
            },
            skipIndex
        }
    },

    // 成功回调
    success(data = '', msg = '', code = CODE.SUCCESS) {
        log4j.debug(data)
        return { code, data, msg }
    },

    // 失败回调
    fail(data = '', msg = '', code = CODE > BUSINESS_ERROR) {
        log4j.debug(msg)
        return { code, data, msg }
    },

    // 把状态码暴露全局
    CODE
}
