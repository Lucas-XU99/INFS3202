const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const questionController = require("../controllers/question");

router.post("/", authMiddleware, questionController.addQuestion);
router.get("/course/:courseId", questionController.getAllQuestionsByCourse);
router.get("/course/:courseId/category/:categoryId", questionController.getAllQuestionsByCourseAndCategory);
router.get("/:questionId", questionController.getQuestionById);
router.post("/search", questionController.searchQuestions);


module.exports = router;
