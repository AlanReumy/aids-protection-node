const Controller = require('./index')
const db = require('../model/index')

class CommentController extends Controller {
  constructor (model) {
    super(model)
  }
}

const commentController = new CommentController(db.comments)

module.exports = commentController
