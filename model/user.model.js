module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: Sequelize.STRING(100),
      phone: Sequelize.STRING(100),
      isVolunteer: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {
      freezeTableName: false,
      timestamps: true,
    }
  );

  User.sync({
    force: false,
  });

  return User;
};
