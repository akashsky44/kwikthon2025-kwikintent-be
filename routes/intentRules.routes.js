const express = require("express");
const router = express.Router();
const { authenticate, checkMerchantAccess } = require("../middleware/auth");
const intentRulesController = require("../controllers/intentRules.controller");

// Protected routes - all routes require merchant access check
router.use(authenticate);
router.use(checkMerchantAccess);

router.get("/", intentRulesController.getAllRules);
router.get("/:type", intentRulesController.getRuleByType);
router.post("/", intentRulesController.createRule);
router.put("/:type", intentRulesController.updateRule);
router.delete("/:type", intentRulesController.deleteRule);

module.exports = router;
