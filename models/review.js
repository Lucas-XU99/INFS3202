const sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");


const Review = sequelize.define("review", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Review };
