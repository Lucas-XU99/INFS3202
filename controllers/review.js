const { Review } = require("../models/index");

function addReview(req, res) {
  const { content, answerId } = req.body;
  Review.create({ content, userId: req.user.id, answerId })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = {
  addReview
};
