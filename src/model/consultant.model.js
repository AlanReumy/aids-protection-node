module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        'consultant',
        {
            age: Sequelize.INTEGER,
            // 0为男，1为女
            sex: Sequelize.INTEGER,
            symptom: Sequelize.STRING(1000),
            cQuestion: Sequelize.STRING(1000),
            cAnswer: Sequelize.STRING(1000),
            haveReplies: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
