module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'consultant',
        {
            age: Sequelize.INTEGER,
            sex: Sequelize.STRING(100),
            symptom: Sequelize.STRING(1000),
            cQuestion: Sequelize.STRING(1000),
            cAnswer: Sequelize.STRING(1000),
            haveReplies: {
                type: Sequelize.BOOLEAN,
                default: false
            },
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
