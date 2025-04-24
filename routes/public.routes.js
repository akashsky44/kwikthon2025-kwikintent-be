const express = require("express");
const router = express.Router();
const pdpController = require("../controllers/pdp.controller");
const analyticsController = require("../controllers/analytics.controller");

// PDP endpoints
router.post("/pdp/poll/:merchantId", pdpController.pollUserBehavior);
router.get("/pdp/widget-script/:merchantId", pdpController.getWidgetScript);

// Analytics endpoints
router.post(
  "/analytics/interaction/:widgetId",
  analyticsController.trackWidgetInteraction
);
router.post(
  "/analytics/conversion/:sessionId",
  analyticsController.trackConversion
);
router.post("/analytics/event/:merchantId", analyticsController.trackEvent);

module.exports = router;
