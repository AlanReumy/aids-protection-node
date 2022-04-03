const Controller = require('.')
const db = require('../model')

class ArticleController extends Controller {
    constructor(model) {
        super(model)
    }
}

const articleController = new ArticleController(db.article)
module.exports = articleController
