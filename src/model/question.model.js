module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'question',
        {
            title: Sequelize.STRING(100),
            desc: Sequelize.STRING(1000),
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id'
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
