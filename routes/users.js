const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const userController = require("../controllers/users");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/current", authMiddleware, userController.getCurrentUser);
router.put("/current", authMiddleware, userController.updateUser);
router.post("/resetCode", userController.sendResetCode);
router.post("/resetPassword", authMiddleware, userController.resetPassword);

module.exports = router;
