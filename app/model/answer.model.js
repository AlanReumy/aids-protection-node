module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define(
        'answers',
        {
            title: Sequelize.STRING(100),
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
            freezeTableName: false,
            timestamps: true
        }
    )

    Answer.sync({
        force: false
    })

    return Answer
}
