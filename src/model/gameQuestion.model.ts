import { Sequelize, DataTypes } from 'sequelize'
import { GameQuestion } from './types/'

export default (sequelize: Sequelize) => {
  GameQuestion.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      question: DataTypes.STRING(1000),
      answerA: DataTypes.STRING(100),
      answerB: DataTypes.STRING(100),
      answerC: DataTypes.STRING(100),
      answerD: DataTypes.STRING(100),
      rightAnswer: DataTypes.STRING(100)
    },
    {
      sequelize,
      tableName: 'comment'
    }
  )
  return GameQuestion
}
