module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'gameQuestion',
        {
            question: Sequelize.STRING(1000),
            answerA: Sequelize.STRING(100),
            answerB: Sequelize.STRING(100),
            answerC: Sequelize.STRING(100),
            answerD: Sequelize.STRING(100),
            rightAnswer: Sequelize.STRING(100)
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
