module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'user',
        {
            username: {
                type: Sequelize.STRING(100),
                unique: true
            },
            password: Sequelize.STRING(100),
            phone: Sequelize.STRING(100),
            avatar: Sequelize.STRING(1000),
            isVolunteer: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            isDoctor: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            isPatient: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            integral: {
                type: Sequelize.INTEGER,
                default: 0
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
