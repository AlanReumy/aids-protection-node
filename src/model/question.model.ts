import { Sequelize, DataTypes } from 'sequelize'
import { Question } from './types'

export default (sequelize: Sequelize) => {
  Question.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id',
        unique: false
      }
    },
    {
      sequelize,
      tableName: 'question'
    }
  )

  return Question
}
