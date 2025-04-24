const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const dashboardController = require("../controllers/dashboard.controller");

// Protected routes
router.get("/metrics", authenticate, dashboardController.getMetrics);
router.get(
  "/recent-detections",
  authenticate,
  dashboardController.getRecentDetections
);
router.get("/widget-stats", authenticate, dashboardController.getWidgetStats);
router.get("/intent-trends", authenticate, dashboardController.getIntentTrends);
router.get(
  "/conversion-stats",
  authenticate,
  dashboardController.getConversionStats
);

module.exports = router;
