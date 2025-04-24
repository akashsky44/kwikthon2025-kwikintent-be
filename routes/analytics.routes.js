const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const analyticsController = require("../controllers/analytics.controller");

// Public routes
router.post(
  "/interaction/:widgetId",
  analyticsController.trackWidgetInteraction
);
router.post("/conversion/:sessionId", analyticsController.trackConversion);
router.post("/event/:merchantId", analyticsController.trackEvent);

module.exports = router;
