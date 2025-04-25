const express = require("express");
const router = express.Router();
const { authenticate, checkMerchantAccess } = require("../middleware/auth");
const widgetController = require("../controllers/widget.controller");

// Apply authentication and merchant access check to all routes
router.use(authenticate);
router.use(checkMerchantAccess);

// CRUD operations
router
  .route("/")
  .post(widgetController.createWidget)
  .get(widgetController.getAllWidgets);

router
  .route("/:id")
  .get(widgetController.getWidgetById)
  .put(widgetController.updateWidget)
  .delete(widgetController.deleteWidget);

// Widget management
router.route("/:id/activate").put(widgetController.activateWidget);

router.route("/:id/deactivate").put(widgetController.deactivateWidget);

router.route("/:id/display-rules").put(widgetController.updateDisplayRules);

// Analytics
router.route("/:id/performance").get(widgetController.getWidgetPerformance);

router.route("/:id/interactions").get(widgetController.getWidgetInteractions);

router
  .route("/:id/conversion-rate")
  .get(widgetController.getWidgetConversionRate);

// Bulk operations
router.route("/bulk-create").post(widgetController.createMultipleWidgets);

router.route("/bulk-update").put(widgetController.updateMultipleWidgets);

router.route("/bulk-delete").delete(widgetController.deleteMultipleWidgets);

// Testing
router.route("/:id/test").post(widgetController.testWidget);

router.route("/:id/preview").get(widgetController.previewWidget);

module.exports = router;
