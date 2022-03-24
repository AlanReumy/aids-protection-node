module.exports = (sequelize, Sequelize) => {
    const ExchangeItem = sequelize.define(
        'exchangeItem',
        {
            name: Sequelize.STRING(100),
            img: Sequelize.STRING(200),
            count: Sequelize.INTEGER,
            integral: Sequelize.INTEGER
        },
        {
            freezeTableName: false,
            timestamps: true
        }
    )

    ExchangeItem.sync({
        force: false
    })

    return ExchangeItem
}
