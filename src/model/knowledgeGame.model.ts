import { Sequelize, DataTypes } from 'sequelize'
import { KnowLedgeGame } from './types/'

export default (sequelize: Sequelize) => {
  KnowLedgeGame.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING(100),
      questionNum: DataTypes.INTEGER,
      personNum: DataTypes.INTEGER,
      finishNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      correct: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      wrong: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      tableName: 'knowledgeGame'
    }
  )
  return KnowLedgeGame
}
