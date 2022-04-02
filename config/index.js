if (process.env.NODE_ENV === 'development') {
    // 开发环境
    module.exports = {
        HOST: 'localhost', //主机名
        DB: 'aidsprotection', //使用的哪个数据库名
        USER: 'root', //账号
        PASSWORD: 'lyxa1105', //密码,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
} else {
    // 线上环境
    // module.exports = {
    //     HOST: '139.196.47.8', //主机名
    //     DB: 'aidsprotection', //使用的哪个数据库名
    //     USER: 'aidsprotection', //账号
    //     PASSWORD: 'lyxa1105', //密码,
    //     dialect: 'mysql',
    //     pool: {
    //         max: 5,
    //         min: 0,
    //         acquire: 30000,
    //         idle: 10000
    //     }
    // }
    module.exports = {
        HOST: 'localhost', //主机名
        DB: 'aidsprotection', //使用的哪个数据库名
        USER: 'root', //账号
        PASSWORD: 'lyxa1105', //密码,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}
