const Koa = require('koa')
const app = new Koa()
const log4j = require('./util/log4j')
const Parser = require('koa-bodyparser')
const cors = require('koa2-cors')
const initApp = require('./util/init')
const db = require('./app/model')

app.use(Parser())
app.use(async (ctx, next) => {
  log4j.info(`get: ${JSON.stringify(ctx.request.query)}`)         // 监听get请求
  log4j.info(`params: ${JSON.stringify(ctx.request.body)}`)       // 监听post请求
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

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
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  }),
)

initApp(app)
db.sequelize.sync()

app.listen(3000)
