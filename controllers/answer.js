const { Answer, Like, User, Review } = require("../models/index");
const { Sequelize, where } = require("sequelize");

async function addAnswer(req, res) {
  const { questionId, content } = req.body;
  Answer.create({ questionId, content, userId: req.user.id })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function likeAnswer(req, res) {
  const { answerId } = req.params;
  console.log("answerId==", answerId);
  const like = await Like.findOne({ where: { userId: req.user.id, answerId } });
  console.log("like==", like);
  if (like) {
    return res.status(400).json({ error: "You already like it" });
  }

  Like.create({ userId: req.user.id, answerId })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function unLikeAnswer(req, res) {
  const { answerId } = req.params;
  const like = await Like.findOne({ where: { userId: req.user.id, answerId } });
  if (!like) {
    return res.status(400).json({ error: "You already unlike it" });
  }

  like
    .destroy()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function getAllAnswerByQuestion(req, res) {
  const { questionId } = req.params;
  Answer.findAll({
    where: { questionId },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Review,
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
      },
    ],
    attributes: {
      include: [
        [
          Sequelize.literal(`(
          SELECT COUNT(*) FROM likes
          WHERE likes.answerId = Answer.id AND likes.userId = ${req.user.id}
        )`),
          "like",
        ],
        [
          Sequelize.literal(`(
          SELECT COUNT(*) FROM likes
          WHERE likes.answerId = Answer.id
        )`),
          "likes",
        ],
      ],
    },
  })
    .then((answers) => {
      res.status(200).json({ data: answers });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

async function pinAnswer(req, res) {
  const { answerId } = req.params;
  const answer = await Answer.findByPk(answerId);
  answer
    .update({ pin: 1 })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

async function unPinAnswer(req, res) {
  const { answerId } = req.params;
  const answer = await Answer.findByPk(answerId);
  answer
    .update({ pin: 0 })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

module.exports = {
  addAnswer,
  likeAnswer,
  unLikeAnswer,
  getAllAnswerByQuestion,
  pinAnswer,
  unPinAnswer,
};
