const Controller = require('./index')
const db = require('../model/index')

class ExchangeItemController extends Controller {
    constructor(model) {
        super(model)
    }
}

const exchangeItemController = new ExchangeItemController(db.exchangeItem)
module.exports = exchangeItemController
