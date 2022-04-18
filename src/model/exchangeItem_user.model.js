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
                field: 'user_id',
                unique: false
            },
            exchangeItemId: {
                type: Sequelize.INTEGER,
                field: 'exchangeItem_id',
                unique: false
            },
            address: {
                type: Sequelize.STRING(1000),
                allowNull: false
            },
            phone: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            addressee: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
