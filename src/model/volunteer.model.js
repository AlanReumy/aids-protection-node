module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'volunteer',
        {
            title: Sequelize.STRING(100),
            desc: Sequelize.STRING(100),
            startDate: Sequelize.DATE(),
            endDate: Sequelize.DATE()
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
