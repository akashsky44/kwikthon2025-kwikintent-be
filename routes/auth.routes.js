const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const authController = require("../controllers/auth.controller");

// Public routes
router.post("/login", authController.login);
router.post("/register", authController.register);

// Protected routes
router.get("/me", authenticate, authController.getCurrentUser);
router.put("/me", authenticate, authController.updateCurrentUser);
router.post("/logout", authenticate, authController.logout);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
