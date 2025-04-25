const express = require("express");
const router = express.Router();
const { authenticate, checkMerchantAccess } = require("../middleware/auth");
const merchantController = require("../controllers/merchant.controller");

// Protected routes
router.get("/", authenticate, merchantController.getAllMerchants);
router.get(
  "/:id",
  authenticate,
  checkMerchantAccess,
  merchantController.getMerchantById
);
router.post("/", authenticate, merchantController.createMerchant);
router.put(
  "/:id",
  authenticate,
  checkMerchantAccess,
  merchantController.updateMerchant
);
router.delete(
  "/:id",
  authenticate,
  checkMerchantAccess,
  merchantController.deleteMerchant
);

// Settings routes
router.get(
  "/:id/settings",
  authenticate,
  checkMerchantAccess,
  merchantController.getMerchantSettings
);
router.put(
  "/:id/settings",
  authenticate,
  checkMerchantAccess,
  merchantController.updateMerchantSettings
);

// Analytics routes
router.get(
  "/:id/analytics",
  authenticate,
  checkMerchantAccess,
  merchantController.getMerchantAnalytics
);
router.get(
  "/:id/analytics/overview",
  authenticate,
  checkMerchantAccess,
  merchantController.getAnalyticsOverview
);
router.get(
  "/:id/analytics/intent-distribution",
  authenticate,
  checkMerchantAccess,
  merchantController.getIntentDistribution
);
router.get(
  "/:id/analytics/conversion-rates",
  authenticate,
  checkMerchantAccess,
  merchantController.getConversionRates
);
router.get(
  "/:id/analytics/widget-performance",
  authenticate,
  checkMerchantAccess,
  merchantController.getWidgetPerformance
);

// Integration routes
router.post(
  "/:id/integrate",
  authenticate,
  checkMerchantAccess,
  merchantController.integrateStore
);
router.delete(
  "/:id/integrate",
  authenticate,
  checkMerchantAccess,
  merchantController.removeIntegration
);
router.get(
  "/:id/integration-status",
  authenticate,
  checkMerchantAccess,
  merchantController.getIntegrationStatus
);

module.exports = router;
