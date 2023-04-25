const sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");
const { User } = require("./users");

const Question = sequelize.define("question", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Question };
