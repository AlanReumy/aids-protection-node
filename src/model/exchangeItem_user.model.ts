import { Sequelize, DataTypes } from 'sequelize'
import { ExchangeItem_User } from './types/'
export default (sequelize: Sequelize) => {
  ExchangeItem_User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id',
        unique: false
      },
      exchangeItemId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'exchangeItem_id',
        unique: false
      },
      address: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      addressee: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    { sequelize, tableName: 'exchangeItem_user' }
  )
  return ExchangeItem_User
}
