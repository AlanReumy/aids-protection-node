import sequelize from '../app/database'
import { DBModel } from './types'
import createUserModel from './user.model'
import createQuestionModel from './question.model'
import createAnswerModel from './answer.model'
import createCommentModel from './comment.model'
import createGameQuestionModel from './gameQuestion.model'
import createKnowledgeGameModel from './knowledgeGame.model'
import createKnowledgeGame_GameQuestionModel from './knowledgeGame_gameQuestion.model'
import createExchangeItemModel from './exchangeItem.model'
import createExchangeItem_UserModel from './exchangeItem_user.model'
import createConsultantModel from './consultant.model'
import createArticleModel from './article.model'

const db: DBModel = {}
db.sequelize = sequelize

// 用户
db.user = createUserModel(sequelize)
// 问题
db.question = createQuestionModel(sequelize)

// 用户 问题
db.user.hasMany(db.question, {
  foreignKey: 'userId',
  sourceKey: 'id'
})
db.question.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id'
})

// 回答
db.answer = createAnswerModel(sequelize)
// 用户 回答
db.user.hasMany(db.answer, {
  foreignKey: 'userId',
  sourceKey: 'id'
})
db.answer.belongsTo(db.user, {
  foreignKey: 'userId',
  targetKey: 'id'
})

// 评论
db.comment = createCommentModel(sequelize)

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
db.gameQuestion = createGameQuestionModel(sequelize)
db.knowledgeGame = createKnowledgeGameModel(sequelize)
db.knowledgeGame_gameQuestion = createKnowledgeGame_GameQuestionModel(sequelize)

db.gameQuestion.belongsToMany(db.knowledgeGame, {
  through: db.knowledgeGame_gameQuestion
})
db.knowledgeGame.belongsToMany(db.gameQuestion, {
  through: db.knowledgeGame_gameQuestion
})

// 积分系统
db.exchangeItem = createExchangeItemModel(sequelize)
db.exchangeItem_user = createExchangeItem_UserModel(sequelize)

// 咨询医生
db.consultant = createConsultantModel(sequelize)

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
db.article = createArticleModel(sequelize)

export default db
