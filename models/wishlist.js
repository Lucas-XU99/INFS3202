const sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");


const Wishlist = sequelize.define("wishlist", {
  wishlistName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Wishlist };
