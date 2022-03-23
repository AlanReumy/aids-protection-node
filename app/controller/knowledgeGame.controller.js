const Controller = require('./index')
const db = require('../model/index')

class KnowLedgeGameController extends Controller {
    constructor(model) {
        super(model)
    }
}

const knowLedgeGameController = new KnowLedgeGameController(db.knowledgeGame)

module.exports = knowLedgeGameController
