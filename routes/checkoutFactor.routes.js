const express = require("express");
const router = express.Router();
const checkoutFactorController = require("../controllers/checkoutFactor.controller");

// CRUD operations
router.post("/", checkoutFactorController.createFactor);
router.get("/", checkoutFactorController.getAllFactors);
router.get("/:id", checkoutFactorController.getFactorById);
router.put("/:id", checkoutFactorController.updateFactor);
router.delete("/:id", checkoutFactorController.deleteFactor);

// Factor management
router.put("/:id/activate", checkoutFactorController.activateFactor);
router.put("/:id/deactivate", checkoutFactorController.deactivateFactor);
router.put("/:id/strategies", checkoutFactorController.updateStrategies);

// Analytics
router.get("/:id/performance", checkoutFactorController.getFactorPerformance);
router.get("/:id/interactions", checkoutFactorController.getFactorInteractions);
router.get(
  "/:id/conversion-rate",
  checkoutFactorController.getFactorConversionRate
);

// Factor types
router.get("/types/:type", checkoutFactorController.getFactorsByType);
router.get(
  "/types/:type/performance",
  checkoutFactorController.getTypePerformance
);

// Intent strategies
router.get("/intent/:intentType", checkoutFactorController.getFactorsByIntent);
router.get(
  "/intent/:intentType/performance",
  checkoutFactorController.getIntentPerformance
);

// Bulk operations
router.post("/bulk-create", checkoutFactorController.createMultipleFactors);
router.put("/bulk-update", checkoutFactorController.updateMultipleFactors);
router.delete("/bulk-delete", checkoutFactorController.deleteMultipleFactors);

module.exports = router;
