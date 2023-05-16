const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const courseController = require("../controllers/course");

router.post("/", authMiddleware, courseController.addCourse);
router.get("/", courseController.getAllCourses);
router.delete("/:courseId", courseController.deleteCourse);



module.exports = router;
