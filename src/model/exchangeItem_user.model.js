module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'exchangeItem_user',
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
            exchangeItemId: {
                type: Sequelize.INTEGER,
                field: 'exchangeItem_id'
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
