const { Wishlist } = require("../models/index");
const { WishlistAnswer } = require("../models/index");
const { Answer } = require("../models/index");
const { User } = require("../models/index");

function addWishlist(req, res) {
  const { wishlistName } = req.body;
  Wishlist.create({ wishlistName, userId: req.user.id })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function getAllWishlists(req, res) {
  Wishlist.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((wishlists) => {
    return res.status(200).json({ data: wishlists });
  });
}

function addAnswerToWishlist(req, res) {
  const { wishlistId, answerId } = req.body;
  WishlistAnswer.create({ wishlistId, answerId })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function removeAnswerFromWishlist(req, res) {
  const { wishlistId, answerId } = req.body;
  const wishlistAnswer = await WishlistAnswer.findOne({ where: { wishlistId, answerId } });
  if (!wishlistAnswer) {
    return res.status(400).json({ error: "Something error!" });
  }
  wishlistAnswer
    .destroy()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function getWishlistDetail(req, res) {
  const { wishlistId } = req.params;
  const wishlistInfo = await Wishlist.findByPk(1)
 
  WishlistAnswer.findAll({
    where: { wishlistId },
    include: [{ model: Wishlist, attributes: ["wishlistName"] }, { model: Answer }],
    order: [["createdAt", "DESC"]],
  })
    .then((wishlistAnswers) => {
      const answers = wishlistAnswers.map((item) => item.answer);
      res.status(200).json({ data: {
        ...wishlistInfo.toJSON(),
        answers
      } });

    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = {
  addWishlist,
  getAllWishlists,
  addAnswerToWishlist,
  removeAnswerFromWishlist,
  getWishlistDetail,
};
