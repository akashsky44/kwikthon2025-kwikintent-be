const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const intentRulesController = require("../controllers/intentRules.controller");

// Protected routes
router.get("/", authenticate, intentRulesController.getAllRules);
router.get("/:type", authenticate, intentRulesController.getRuleByType);
router.post("/", authenticate, intentRulesController.createRule);
router.put("/:type", authenticate, intentRulesController.updateRule);
router.delete("/:type", authenticate, intentRulesController.deleteRule);

module.exports = router;
