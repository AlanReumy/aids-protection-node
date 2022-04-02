const Koa = require('koa')
const app = new Koa()
const log4j = require('./util/log4j')
const Parser = require('koa-bodyparser')
const cors = require('koa2-cors')
const initApp = require('./util/init')
const koaBody = require('koa-body')
const koajwt = require('koa-jwt')
const mime = require('mime-types')
const path = require('path')
const fs = require('fs')
const SECRET = 'aids-protection'
// jwt密钥
module.exports = {
    SECRET
}

app.use(Parser())
app.use(async (ctx, next) => {
    log4j.info(`get: ${JSON.stringify(ctx.request.query)}`) // 监听get请求
    log4j.info(`params: ${JSON.stringify(ctx.request.body)}`) // 监听post请求
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(koaBody({ multipart: true }))
app.use(require('koa-static')(__dirname + '/public'))

//配置 cors 的中间件
app.use(
    cors({
        origin: function (ctx) {
            //设置允许来自指定域名请求
            return '*'
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        // 设置所允许的HTTP请求方法
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        // 设置服务器支持的所有头信息字段
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
        // 设置获取其他自定义字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']
    })
)

// jwt验证
// 中间件对token进行验证
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = {
                code: 401,
                msg: err.message
            }
        } else {
            throw err
        }
    })
})

app.use(
    koajwt({ secret: SECRET }).unless({
        path: [/^\/api\/user\/login/, /^\/api\/user\/register/, /^\/public/]
    })
)

app.use(async (ctx) => {
    let filePath = path.join(__dirname, ctx.url) //图片地址
    let file = null
    try {
        file = fs.readFileSync(filePath) //读取文件
    } catch (error) {
        //如果服务器不存在请求的图片，返回默认图片
        filePath = path.join(__dirname, '../public/demo.png') //默认图片地址
        file = fs.readFileSync(filePath) //读取文件
    }

    let mimeType = mime.lookup(filePath) //读取图片文件类型
    ctx.set('content-type', mimeType) //设置返回类型
    ctx.body = file //返回图片
})

// 初始化app
initApp(app)

app.listen(3000)
