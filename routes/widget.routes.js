const express = require("express");
const router = express.Router();
const widgetController = require("../controllers/widget.controller");

// CRUD operations
router.post("/", widgetController.createWidget);
router.get("/", widgetController.getAllWidgets);
router.get("/:id", widgetController.getWidgetById);
router.put("/:id", widgetController.updateWidget);
router.delete("/:id", widgetController.deleteWidget);

// Widget management
router.put("/:id/activate", widgetController.activateWidget);
router.put("/:id/deactivate", widgetController.deactivateWidget);
router.put("/:id/display-rules", widgetController.updateDisplayRules);

// Analytics
router.get("/:id/performance", widgetController.getWidgetPerformance);
router.get("/:id/interactions", widgetController.getWidgetInteractions);
router.get("/:id/conversion-rate", widgetController.getWidgetConversionRate);

// Bulk operations
router.post("/bulk-create", widgetController.createMultipleWidgets);
router.put("/bulk-update", widgetController.updateMultipleWidgets);
router.delete("/bulk-delete", widgetController.deleteMultipleWidgets);

// Testing
router.post("/:id/test", widgetController.testWidget);
router.get("/:id/preview", widgetController.previewWidget);

module.exports = router;
