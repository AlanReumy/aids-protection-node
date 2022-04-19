module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'knowLedgeGame',
        {
            name: Sequelize.STRING(100),
            questionNum: Sequelize.INTEGER,
            personNum: Sequelize.INTEGER,
            finishNum: {
                type: Sequelize.INTEGER,

                defaultValue: 0
            },
            correct: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            wrong: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
            alter: true
        }
    )
}
