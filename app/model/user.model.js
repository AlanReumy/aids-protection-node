module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        'users',
        {
            username: {
                type: Sequelize.STRING(100),
                unique: true
            },
            password: Sequelize.STRING(100),
            phone: Sequelize.STRING(100),
            avatar: Sequelize.STRING(100),
            // 是否是志愿者
            isVolunteer: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            // 是否是医生
            isDoctor: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            // 是否是患者
            isPatient: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            // 积分
            integral: {
                type: Sequelize.INTEGER,
                default: 0
            }
        },
        {
            freezeTableName: false,
            timestamps: true
        }
    )

    User.sync({
        force: false
    })

    return User
}
