const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router')
const errorHandler = require('../app/error-handle')

app.use(bodyParser())
app.useRoutes = useRoutes
app.useRoutes()

app.on('error', errorHandler)

module.exports = app
