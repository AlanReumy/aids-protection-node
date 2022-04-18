module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'knowledgeGame_gameQuestion',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            knowledgeGameId: {
                type: Sequelize.INTEGER,
                field: 'knowledgeGame_id'
            },
            gameQuestionId: {
                type: Sequelize.INTEGER,
                field: 'gameQuestion_id'
            }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    )
}
