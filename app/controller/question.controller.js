const Controller = require('.')
const db = require('../model')

class QuestionController extends Controller {
  constructor (model) {
    super(model)
  }
}

const questionController = new QuestionController(db.questions)
module.exports = questionController
