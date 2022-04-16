module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'answer',
        {
            title: Sequelize.STRING(1000),
            content: Sequelize.STRING(1000),
            agree: {
                type: Sequelize.INTEGER,
                default: 0
            },
            disAgree: {
                type: Sequelize.INTEGER,
                default: 0
            },
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id',
                allowNull: false
            },
            questionId: {
                type: Sequelize.INTEGER,
                field: 'question_id',
                allowNull: false
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
