const dbConfig = require('../../config/index')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

// 用户
db.users = require('./user.model')(sequelize, Sequelize)
// 志愿服务
db.volunteers = require('./volunteer.model')(sequelize, Sequelize)
db.volunteerUser = require('./volunteer_user.model')(
    sequelize,
    Sequelize,
    db.users,
    db.volunteers
)

// 问题
db.questions = require('./question.model')(sequelize, Sequelize)
// 问题
db.answers = require('./answer.model')(sequelize, Sequelize)
// 评论
db.comments = require('./comment.model')(sequelize, Sequelize)

db.users.belongsToMany(db.volunteers, { through: db.volunteerUser })
db.volunteers.belongsToMany(db.users, { through: db.volunteerUser })

// 用户 回答
db.users.hasMany(db.answers, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.answers.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 用户 问题
db.users.hasMany(db.questions, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.questions.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 用户 评论
db.users.hasMany(db.comments, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.comments.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 问题 回答
db.questions.hasMany(db.answers, {
    foreignKey: 'questionId',
    sourceKey: 'id'
})
db.answers.belongsTo(db.questions, {
    foreignKey: 'questionId',
    targetKey: 'id'
})

// 回答 评论
db.answers.hasMany(db.comments, {
    foreignKey: 'answerId',
    sourceKey: 'id'
})
db.comments.belongsTo(db.answers, {
    foreignKey: 'answerId',
    targetKey: 'id'
})

// 知识竞赛
db.knowledgeGame = require('./knowledgeGame.model')(sequelize, Sequelize)
// 积分系统
db.exchangeItem = require('./exchangeItem.model')(sequelize, Sequelize)
// 咨询医生
db.consultant = require('./consultant.model')(sequelize, Sequelize)

db.users.hasMany(db.consultant, {
    foreignKey: 'userId',
    sourceKey: 'id'
})
db.consultant.belongsTo(db.users, {
    foreignKey: 'userId',
    targetKey: 'id'
})

// 文章
db.article = require('./article.model')(sequelize, Sequelize)

module.exports = db
