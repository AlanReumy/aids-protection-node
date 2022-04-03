module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define(
        'articles',
        {
            title: Sequelize.STRING(100),
            content: Sequelize.STRING(100)
        },
        {
            freezeTableName: false,
            timestamps: true
        }
    )

    Article.sync({
        force: false
    })

    return Article
}
