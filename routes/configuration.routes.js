const express = require("express");
const router = express.Router();
const configController = require("../controllers/configuration.controller");

// Configuration management
router.post("/", configController.createConfig);
router.get("/", configController.getActiveConfig);
router.get("/history", configController.getConfigHistory);
router.put("/:id", configController.updateConfig);
router.delete("/:id", configController.deleteConfig);

// Intent rules
router.get("/intent-rules", configController.getAllIntentRules);
router.get("/intent-rules/:type", configController.getIntentRulesByType);
router.put("/intent-rules/:type", configController.updateIntentRules);
router.get(
  "/intent-rules/:type/performance",
  configController.getIntentRulePerformance
);

// Widget settings
router.get("/widget-settings", configController.getAllWidgetSettings);
router.get("/widget-settings/:type", configController.getWidgetSettingsByType);
router.put("/widget-settings/:type", configController.updateWidgetSettings);
router.get(
  "/widget-settings/:type/performance",
  configController.getWidgetSettingPerformance
);

// Checkout factors
router.get("/checkout-factors", configController.getAllCheckoutFactors);
router.get(
  "/checkout-factors/:type",
  configController.getCheckoutFactorsByType
);
router.put("/checkout-factors/:type", configController.updateCheckoutFactors);
router.get(
  "/checkout-factors/:type/performance",
  configController.getCheckoutFactorPerformance
);

// Analytics
router.get("/analytics/overview", configController.getAnalyticsOverview);
router.get(
  "/analytics/intent-distribution",
  configController.getIntentDistribution
);
router.get("/analytics/conversion-rates", configController.getConversionRates);
router.get(
  "/analytics/widget-performance",
  configController.getWidgetPerformance
);
router.get(
  "/analytics/checkout-performance",
  configController.getCheckoutPerformance
);

// Export
router.get("/export", configController.exportConfiguration);
router.get("/export/intent-rules", configController.exportIntentRules);
router.get("/export/widget-settings", configController.exportWidgetSettings);
router.get("/export/checkout-factors", configController.exportCheckoutFactors);

// Import
router.post("/import", configController.importConfiguration);
router.post("/import/intent-rules", configController.importIntentRules);
router.post("/import/widget-settings", configController.importWidgetSettings);
router.post("/import/checkout-factors", configController.importCheckoutFactors);

// Validation
router.post("/validate", configController.validateConfiguration);
router.post("/validate/intent-rules", configController.validateIntentRules);
router.post(
  "/validate/widget-settings",
  configController.validateWidgetSettings
);
router.post(
  "/validate/checkout-factors",
  configController.validateCheckoutFactors
);

module.exports = router;
