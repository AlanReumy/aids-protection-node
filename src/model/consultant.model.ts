import { Sequelize, DataTypes } from 'sequelize'
import { Consultant } from './types/'
export default (sequelize: Sequelize) => {
  Consultant.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      age: DataTypes.INTEGER,
      // 0为男，1为女
      sex: DataTypes.INTEGER,
      symptom: DataTypes.STRING(1000),
      cQuestion: DataTypes.STRING(1000),
      cAnswer: DataTypes.STRING(1000),
      haveReplies: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id'
      }
    },
    { sequelize, tableName: 'consultant' }
  )
  return Consultant
}
