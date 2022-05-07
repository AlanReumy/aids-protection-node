import Application from 'koa'
import fs from 'fs'

const useRoutes = function (app: Application) {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    import(`./${file}`).then((router) => {
      app.use(router.default.routes())
      app.use(router.default.allowedMethods())
    })
  })
}

export default useRoutes
