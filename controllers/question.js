const { Question, Course, Category, User } = require("../models/index");
const { Op } = require("sequelize");

function addQuestion(req, res) {
  const { content, categoryId, courseId } = req.body;
  Question.create({ content, userId: req.user.id, courseId, categoryId })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function searchQuestions(req, res) {
  const { keyword } = req.body;
  Question.findAll({
    where: {
      content: {
        [Op.like]: `%${keyword}%`,
      },
    },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Category,
        attributes: ["id", "categoryName"],
      },
      {
        model: Course,
        attributes: ["id", "courseName"],
      },
    ],
  })
    .then((questions) => {
      res.status(200).json({ data: questions });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function searchAutocomplte(req, res) {
  const { keyword } = req.body;
  if(!keyword){
    return res.status(200).json({ data: [] });
  }
  Question.findAll({
    where: {
      content: {
        [Op.like]: `%${keyword}%`,
      },
    },
  })
    .then((questions) => {
      return res.status(200).json({ data: questions });
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
}

function getAllQuestionsByCourse(req, res) {
  const { courseId } = req.params;
  Question.findAll({
    where: { courseId },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Category,
        attributes: ["id", "categoryName"],
      },
      {
        model: Course,
        attributes: ["id", "courseName"],
      },
    ],
  })
    .then((questions) => {
      res.status(200).json({ data: questions });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function getAllQuestionsByCourseAndCategory(req, res) {
  const { courseId, categoryId } = req.params;
  Question.findAll({
    where: { courseId, categoryId },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Category,
        attributes: ["id", "categoryName"],
      },
      {
        model: Course,
        attributes: ["id", "courseName"],
      },
    ],
  })
    .then((questions) => {
      res.status(200).json({ data: questions });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function getQuestionById(req, res) {
  const { questionId } = req.params;
  Question.findByPk(questionId, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Category,
        attributes: ["id", "categoryName"],
      },
      {
        model: Course,
        attributes: ["id", "courseName"],
      },
    ],
  })
    .then((questions) => {
      res.status(200).json({ data: questions });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

module.exports = {
  addQuestion,
  getAllQuestionsByCourse,
  getQuestionById,
  getAllQuestionsByCourseAndCategory,
  searchQuestions,
  searchAutocomplte
};
