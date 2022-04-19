const db = require('../model/index')

class CommentService {
    async create(content, answerId, userId) {
        return await db.comment.create({ content, answerId, userId })
    }

    async list(limit, offset, answerId) {
        return await db.comment.findAll(
            { limit, offset },
            { where: { answerId } }
        )
    }
}

module.exports = new CommentService()
