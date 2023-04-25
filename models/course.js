const sequelize = require("./config").sequelize;
const { User } = require("./users");
const { Question } = require("./question");
const { DataTypes } = require("sequelize");

const Course = sequelize.define("course", {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { Course };
