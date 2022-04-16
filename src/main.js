const app = require('./app/index')
const { PORT } = require('./app/config')

app.listen(PORT, () => {
    console.log(`服务器在${PORT}端口启动成功`)
})
