const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");

// Import route handlers
const authRoutes = require("./auth.routes");
const widgetRoutes = require("./widget.routes");
const widgetPreviewRoutes = require("./widget-preview.routes");
const checkoutFactorRoutes = require("./checkoutFactor.routes");
const configurationRoutes = require("./configuration.routes");
const merchantRoutes = require("./merchant.routes");
const publicRoutes = require("./public.routes");
const pdpRoutes = require("./pdp.routes");
const analyticsRoutes = require("./analytics.routes");
const dashboardRoutes = require("./dashboard.routes");
const intentRulesRoutes = require("./intentRules.routes");

// Public routes
router.use("/public", publicRoutes);

// Protected routes
router.use("/auth", authRoutes);
router.use("/widgets", authenticate, widgetRoutes);
router.use("/widgets", authenticate, widgetPreviewRoutes);
router.use("/checkout-factors", authenticate, checkoutFactorRoutes);
router.use("/configuration", authenticate, configurationRoutes);
router.use("/merchants", authenticate, merchantRoutes);
router.use("/pdp", authenticate, pdpRoutes);
router.use("/analytics", authenticate, analyticsRoutes);
router.use("/dashboard", authenticate, dashboardRoutes);
router.use("/intent-rules", authenticate, intentRulesRoutes);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
