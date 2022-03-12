module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define(
    'comments',
    {
      content: Sequelize.STRING(1000),
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      answerId: {
        type: Sequelize.INTEGER,
        field: 'answer_id',
      },
    },
    {
      freezeTableName: false,
      timestamps: true,
    },
  )

  Comment.sync({
    force: false,
  })

  return Comment
}
