module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'article',
        {
            title: Sequelize.STRING(100),
            content: Sequelize.STRING(1000),
            type: Sequelize.INTEGER
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
