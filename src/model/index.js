const Sequelize = require('sequelize')
const sequelize = require('../app/database')

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// 用户
db.user = require('./user.model')(sequelize, Sequelize)
// 志愿服务
db.volunteer = require('./volunteer.model')(sequelize, Sequelize)
db.volunteerUser = require('./volunteer_user.model')(sequelize, Sequelize)

db.user.belongsToMany(db.volunteer, { through: db.volunteerUser })
db.volunteer.belongsToMany(db.user, { through: db.volunteerUser })

// 问题
db.question = require('./question.model')(sequelize, Sequelize)
// 回答
db.answer = require('./answer.model')(sequelize, Sequelize)
// 评论
db.comment = require('./comment.model')(sequelize, Sequelize)

// 用户 回答
db.user.hasMany(db.answer, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.answer.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 用户 问题
db.user.hasMany(db.question, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.question.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 用户 评论
db.user.hasMany(db.comment, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.comment.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 问题 回答
db.question.hasMany(db.answer, {
    foreignKey: 'questionId',
    sourceKey: 'id'
})
db.answer.belongsTo(db.question, {
    foreignKey: 'questionId',
    targetKey: 'id'
})

// 回答 评论
db.answer.hasMany(db.comment, {
    foreignKey: 'answerId',
    sourceKey: 'id'
})
db.comment.belongsTo(db.answer, {
    foreignKey: 'answerId',
    targetKey: 'id'
})

// 知识竞赛
db.gameQuestion = require('./gameQuestion.model')(sequelize, Sequelize)
db.knowledgeGame = require('./knowledgeGame.model')(sequelize, Sequelize)
db.knowledgeGame_gameQuestion = require('./knowledgeGame_gameQuestion.model')(
    sequelize,
    Sequelize
)

db.gameQuestion.belongsToMany(db.knowledgeGame, {
    through: db.knowledgeGame_gameQuestion
})
db.knowledgeGame.belongsToMany(db.gameQuestion, {
    through: db.knowledgeGame_gameQuestion
})

// 积分系统
db.exchangeItem = require('./exchangeItem.model')(sequelize, Sequelize)
db.exchangeItem_user = require('./exchangeItem_user.model')(
    sequelize,
    Sequelize
)

// 咨询医生
db.consultant = require('./consultant.model')(sequelize, Sequelize)

// 用户 咨询
db.user.hasMany(db.consultant, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.consultant.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 文章
db.article = require('./article.model')(sequelize, Sequelize)

module.exports = db
