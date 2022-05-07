import { Sequelize, DataTypes } from 'sequelize'
import { ExchangeItem } from './types'

export default (sequelize: Sequelize) => {
  ExchangeItem.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: DataTypes.STRING(100),
      img: DataTypes.STRING(10000),
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      sequelize,
      tableName: 'exchangeItem'
    }
  )

  return ExchangeItem
}
