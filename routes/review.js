const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const reviewController = require("../controllers/review");

router.post("/", authMiddleware, reviewController.addReview);


module.exports = router;
