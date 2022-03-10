module.exports = {
  HOST: "localhost", //主机名
  DB: "aidsprotection", //使用的哪个数据库名
  USER: "aidsprotection", //账号
  PASSWORD: "lyxa1105", //密码,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};