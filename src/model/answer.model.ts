import { Sequelize, DataTypes } from 'sequelize'
import { Answer } from './types'

export default (sequelize: Sequelize) => {
  Answer.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING(1000),
      content: DataTypes.STRING(1000),
      agree: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      disAgree: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id',
        allowNull: false
      },
      questionId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'question_id',
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'answer'
    }
  )

  return Answer
}
