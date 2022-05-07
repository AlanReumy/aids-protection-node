import { Sequelize, DataTypes } from 'sequelize'
import { Article } from './types/index'

export default (sequelize: Sequelize) => {
  Article.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: DataTypes.STRING(100),
      cover: DataTypes.STRING(1000),
      content: DataTypes.STRING(1000),
      type: DataTypes.INTEGER
    },
    {
      sequelize,
      tableName: 'article'
    }
  )
  return Article
}
