const { Course } = require("../models/index");
const { User } = require("../models/index");


function addCourse(req, res) {
  const { courseName } = req.body;
  Course.create({ courseName, userId: req.user.id })
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
}

function getAllCourses(req, res) {
  Course.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  }).then((courses) => {
    return res.status(200).json({ data: courses });
  });
}

module.exports = {
  addCourse,
  getAllCourses,
};
