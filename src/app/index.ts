import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import useRoutes from '../router'
import errorHandler from './error-handle'
import cors from 'koa2-cors'
import { CORS_CONFIG } from './config'

const app = new Koa()

app.use(bodyParser())
// 加载路由
useRoutes(app)
// 错误处理
app.on('error', errorHandler)
//配置 cors 的中间件
app.use(cors(CORS_CONFIG))
app.use(koaStatic('./uploads'))

export default app
