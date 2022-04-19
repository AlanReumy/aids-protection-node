const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')
const errorHandler = require('../app/error-handle')
const cors = require('koa2-cors')
const { CORS_CONFIG } = require('./config')

app.use(bodyParser())
app.useRoutes = useRoutes
// 加载路由
app.useRoutes()

// 错误处理
app.on('error', errorHandler)

//配置 cors 的中间件
app.use(cors(CORS_CONFIG))

module.exports = app
