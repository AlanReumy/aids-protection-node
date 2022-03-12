const Controller = require('../controller/index')
const db = require('../model/index')

class UserController extends Controller {
  constructor (model) {
    super(model)
  }
}

const userController = new UserController(db.users)

module.exports = userController
