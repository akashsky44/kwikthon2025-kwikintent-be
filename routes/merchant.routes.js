const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const merchantController = require("../controllers/merchant.controller");

// Protected routes
router.get("/", authenticate, merchantController.getAllMerchants);
router.get("/:id", authenticate, merchantController.getMerchantById);
router.post("/", authenticate, merchantController.createMerchant);
router.put("/:id", authenticate, merchantController.updateMerchant);
router.delete("/:id", authenticate, merchantController.deleteMerchant);

// Settings routes
router.get(
  "/:id/settings",
  authenticate,
  merchantController.getMerchantSettings
);
router.put(
  "/:id/settings",
  authenticate,
  merchantController.updateMerchantSettings
);

// Analytics routes
router.get(
  "/:id/analytics",
  authenticate,
  merchantController.getMerchantAnalytics
);
router.get(
  "/:id/analytics/overview",
  authenticate,
  merchantController.getAnalyticsOverview
);
router.get(
  "/:id/analytics/intent-distribution",
  authenticate,
  merchantController.getIntentDistribution
);
router.get(
  "/:id/analytics/conversion-rates",
  authenticate,
  merchantController.getConversionRates
);
router.get(
  "/:id/analytics/widget-performance",
  authenticate,
  merchantController.getWidgetPerformance
);

// Integration routes
router.post("/:id/integrate", authenticate, merchantController.integrateStore);
router.delete(
  "/:id/integrate",
  authenticate,
  merchantController.removeIntegration
);
router.get(
  "/:id/integration-status",
  authenticate,
  merchantController.getIntegrationStatus
);

module.exports = router;
