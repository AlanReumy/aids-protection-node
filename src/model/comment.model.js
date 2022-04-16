module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'comment',
        {
            content: Sequelize.STRING(1000),
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id'
            },
            answerId: {
                type: Sequelize.INTEGER,
                field: 'answer_id'
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
