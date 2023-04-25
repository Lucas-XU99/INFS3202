const sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");

const Like = sequelize.define("like", {});

module.exports = { Like };
