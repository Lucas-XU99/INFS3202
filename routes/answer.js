const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const answerController = require("../controllers/answer");

router.post("/", authMiddleware, answerController.addAnswer);
router.get("/question/:questionId", authMiddleware, answerController.getAllAnswerByQuestion);
router.get("/like/:answerId", authMiddleware, answerController.likeAnswer);
router.get("/unLike/:answerId", authMiddleware, answerController.unLikeAnswer);
router.get("/pin/:answerId", authMiddleware, answerController.pinAnswer);
router.get("/unPin/:answerId", authMiddleware, answerController.unPinAnswer);

module.exports = router;
