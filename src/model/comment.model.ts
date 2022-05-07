import { Sequelize, DataTypes } from 'sequelize'
import { Comment } from './types/'

export default (sequelize: Sequelize) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      content: DataTypes.STRING(1000),
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id'
      },
      answerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'answer_id'
      }
    },
    {
      sequelize,
      tableName: 'comment'
    }
  )
  return Comment
}
