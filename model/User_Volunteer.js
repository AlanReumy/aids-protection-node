const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const User_Volunteer = sequelize.define(
  "user_volunteer",
  {
    user_id: Sequelize.INTEGER(),
    volunteer_id: Sequelize.INTEGER(),
  },
  {
    freezeTableName: false,
    timestamps: true,
  }
);

User_Volunteer.sync({
  force: true,
});

module.exports = User_Volunteer;
