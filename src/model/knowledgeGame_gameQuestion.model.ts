import { Sequelize, DataTypes } from 'sequelize'
import { KnowledgeGame_GameQuestion } from './types/index'

export default (sequelize: Sequelize) => {
  KnowledgeGame_GameQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      knowledgeGameId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'knowledgeGame_id'
      },
      gameQuestionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'gameQuestion_id'
      }
    },
    {
      sequelize,
      tableName: 'knowledgeGame_gameQuestion'
    }
  )

  return KnowledgeGame_GameQuestion
}
