const Controller = require('./index')
const db = require('../model/index')

class AnswerController extends Controller {
  constructor (model) {
    super(model)
  }
}

const answerController = new AnswerController(db.answers)
module.exports = answerController
