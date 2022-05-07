import { DataTypes, Sequelize } from 'sequelize'
import { User } from './types'

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: new DataTypes.STRING(500),
        allowNull: false
      },
      password: {
        type: new DataTypes.STRING(500),
        allowNull: false
      },
      phone: DataTypes.INTEGER,
      avatar: DataTypes.STRING(1000),
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDoctor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isPatient: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      tableName: 'users',
      sequelize
    }
  )

  return User
}
