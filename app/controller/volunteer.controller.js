const db = require('../model')
const Controller = require('./index')

class VolunteerController extends Controller {
    constructor(model) {
        super(model)
    }

    findListByUserId(userId) {
        return db.volunteerUser.findAll({
            where: {
                userId
            }
        })
    }
}

const volunteerController = new VolunteerController(db.volunteers)

module.exports = volunteerController
