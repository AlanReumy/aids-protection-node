module.exports = (sequelize, Sequelize, User, Volunteer) => {
  const volunteerUser = sequelize.define(
    "volunteerUser",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: "user_id",
      },
      volunteerId: {
        type: Sequelize.INTEGER,
        field: "volunteer_id",
      },
    },
    {
      freezeTableName: false,
      timestamps: true,
    }
  );

  volunteerUser.sync({
    force: false,
  });

  return volunteerUser;
};
