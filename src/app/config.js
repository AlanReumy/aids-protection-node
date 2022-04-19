const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(
    path.resolve(__dirname, './keys/private.key')
)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

const CORS_CONFIG = {
    origin: function () {
        //设置允许来自指定域名请求
        return '*'
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    // 设置所允许的HTTP请求方法
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    // 设置服务器支持的所有头信息字段
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    // 设置获取其他自定义字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
}

module.exports = {
    DATABASE_HOST,
    DATABASE_DIALECT,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_POOP_MAX,
    DATABASE_POOL_MIN,
    DATABASE_POOL_ACQUIRE,
    DATABASE_POOL_IDLE,
    DATABASE_DB,
    PORT
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY

module.exports.CORS_CONFIG = CORS_CONFIG
