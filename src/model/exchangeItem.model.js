module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'exchangeItem',
        {
            name: Sequelize.STRING(100),
            img: Sequelize.STRING(1000),
            count: Sequelize.INTEGER,
            integral: Sequelize.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
