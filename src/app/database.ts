import { Sequelize } from 'sequelize'
const {
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_POOP_MAX,
  DATABASE_POOL_MIN,
  DATABASE_POOL_ACQUIRE,
  DATABASE_POOL_IDLE,
  DATABASE_DB
} = require('./config')

const sequelize = new Sequelize(DATABASE_DB, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
  pool: {
    max: parseInt(DATABASE_POOP_MAX),
    min: parseInt(DATABASE_POOL_MIN),
    acquire: parseInt(DATABASE_POOL_ACQUIRE),
    idle: parseInt(DATABASE_POOL_IDLE)
  },
  logging: false
})

sequelize.sync({
  force: false
})

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(() => {
    console.log('数据库连接失败')
  })

export default sequelize
