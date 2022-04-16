module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'volunteerUser',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id'
            },
            volunteerId: {
                type: Sequelize.INTEGER,
                field: 'volunteer_id'
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
