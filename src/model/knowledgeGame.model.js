module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'knowLedgeGame',
        {
            name: Sequelize.STRING(100),
            personNum: Sequelize.INTEGER,
            finishNum: {
                type: Sequelize.INTEGER,
                default: 0
            },
            correct: {
                type: Sequelize.INTEGER,
                default: 0
            },
            wrong: {
                type: Sequelize.INTEGER,
                default: 0
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
