const express = require("express");
const router = express.Router();
const pdpController = require("../controllers/pdp.controller");

// Analytics routes
router.get("/analytics/overview", pdpController.getAnalyticsOverview);
router.get(
  "/analytics/intent-distribution",
  pdpController.getIntentDistribution
);
router.get("/analytics/conversion-rates", pdpController.getConversionRates);
router.get("/analytics/widget-performance", pdpController.getWidgetPerformance);

// Export routes
router.get("/export/analytics", pdpController.exportAnalytics);
router.get("/export/detections", pdpController.exportDetections);

module.exports = router;
