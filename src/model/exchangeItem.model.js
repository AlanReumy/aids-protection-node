module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'exchangeItem',
        {
            name: Sequelize.STRING(100),
            img: Sequelize.STRING(10000),
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
