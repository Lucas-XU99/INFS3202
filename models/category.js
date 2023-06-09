const sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = { Category };
