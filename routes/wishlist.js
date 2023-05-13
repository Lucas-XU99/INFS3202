const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const wishlistController = require("../controllers/wishlist");

router.post("/", authMiddleware, wishlistController.addWishlist);
router.get("/",authMiddleware, wishlistController.getAllWishlists);
router.post("/answer",authMiddleware, wishlistController.addAnswerToWishlist);
router.delete("/answer",authMiddleware, wishlistController.removeAnswerFromWishlist);
router.get("/:wishlistId",authMiddleware, wishlistController.getWishlistDetail);


module.exports = router;
