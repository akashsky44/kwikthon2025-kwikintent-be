const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const widgetPreviewController = require("../controllers/widget-preview.controller");

// Widget preview routes
router.get(
  "/preview/:intentType",
  authenticate,
  widgetPreviewController.getWidgetPreview
);

router.put(
  "/preview/:intentType/settings",
  authenticate,
  widgetPreviewController.updateWidgetPreviewSettings
);

router.get(
  "/preview/product/:productId",
  authenticate,
  widgetPreviewController.getPreviewProductData
);

module.exports = router;
