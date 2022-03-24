const Controller = require('./index')
const db = require('../model/index')

class ConsultantController extends Controller {
    constructor(model) {
        super(model)
    }
}

const consultantController = new ConsultantController(db.consultant)
module.exports = consultantController
