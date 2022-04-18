module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'user',
        {
            username: {
                type: Sequelize.STRING(500),
                unique: true
            },
            password: Sequelize.STRING(500),
            phone: Sequelize.STRING(100),
            avatar: Sequelize.STRING(1000),
            isAdmin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isVolunteer: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isDoctor: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            isPatient: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            points: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
