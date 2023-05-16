const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const answerController = require("../controllers/answer");

router.post("/", authMiddleware, answerController.addAnswer);
router.get("/", authMiddleware, answerController.getAllAnswers);
router.get("/question/:questionId", authMiddleware, answerController.getAllAnswerByQuestion);
router.get("/like/:answerId", authMiddleware, answerController.likeAnswer);
router.get("/unLike/:answerId", authMiddleware, answerController.unLikeAnswer);
router.get("/pin/:answerId", authMiddleware, answerController.pinAnswer);
router.get("/unPin/:answerId", authMiddleware, answerController.unPinAnswer);
router.post("/", authMiddleware, answerController.getAllAnswers);
router.delete("/:answerId", authMiddleware, answerController.deleteAnswer);

module.exports = router;
