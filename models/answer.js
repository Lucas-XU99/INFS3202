const sequelize = require("./config").sequelize;

const { DataTypes } = require("sequelize");

const Answer = sequelize.define("answer", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = { Answer };
