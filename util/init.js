const requireDirectory = require('require-directory')
const Router = require('koa-router')
const db = require('../app/model/index')

function initApp(app) {
    initLoadRouters(app)
    loadHttpException()
    loadConfig()
    loadModel()
}

function initLoadRouters(app) {
    const apiDirectory = `${process.cwd()}/app/service`
    requireDirectory(module, apiDirectory, {
        visit: (obj) => {
            if (obj instanceof Router) {
                app.use(obj.routes())
            }
        }
    })
}

function loadHttpException() {
    const errors = require('./httpException')
    global.errs = errors
}

function loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/index.js'
    const config = require(configPath)
    global.config = config
}

function loadModel() {
    db.sequelize.sync()
}

module.exports = initApp
