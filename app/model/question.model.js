module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define(
        'questions',
        {
            title: Sequelize.STRING(100),
            desc: Sequelize.STRING(100),
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id'
            }
        },
        {
            freezeTableName: false,
            timestamps: true
        }
    )

    Question.sync({
        force: false
    })

    return Question
}
