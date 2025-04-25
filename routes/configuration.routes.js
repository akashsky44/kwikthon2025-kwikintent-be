const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const configController = require("../controllers/configuration.controller");

// Configuration management
router.post("/", authenticate, configController.createConfig);
router.get("/", authenticate, configController.getActiveConfig);
router.get("/history", authenticate, configController.getConfigHistory);
router.put("/:id", authenticate, configController.updateConfig);
router.delete("/:id", authenticate, configController.deleteConfig);

// Import/Export
router.get("/export", authenticate, configController.exportConfiguration);
router.post("/import", authenticate, configController.importConfiguration);

// Validation
router.post("/validate", authenticate, configController.validateConfiguration);

module.exports = router;
