const { Category } = require("../models/index");

async function getAllCategories(req, res) {
  Category.findAll().then((categories) => {
    return res.status(200).json({ data: categories });
  });
}

module.exports = {
  getAllCategories,
};
