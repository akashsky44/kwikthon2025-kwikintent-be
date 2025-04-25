const Detection = require("../models/detection.model");
const Widget = require("../models/widget.model");

// @desc    Get dashboard metrics
// @route   GET /api/dashboard/metrics
// @access  Private
exports.getMetrics = async (req, res, next) => {
  try {
    const totalDetections = await Detection.countDocuments({
      merchant: req.user.merchant,
    });
    const totalWidgets = await Widget.countDocuments({
      merchant: req.user.merchant,
    });
    const conversionRate = await calculateConversionRate(req.user.merchant);

    res.status(200).json({
      success: true,
      data: {
        totalDetections,
        totalWidgets,
        conversionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent detections
// @route   GET /api/dashboard/recent-detections
// @access  Private
exports.getRecentDetections = async (req, res, next) => {
  try {
    const detections = await Detection.find({ merchant: req.user.merchant })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("widgetShown", "name");

    res.status(200).json({
      success: true,
      data: detections,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget stats
// @route   GET /api/dashboard/widget-stats
// @access  Private
exports.getWidgetStats = async (req, res, next) => {
  try {
    const widgets = await Widget.find({ merchant: req.user.merchant });
    const stats = [];

    for (const widget of widgets) {
      const impressions = await Detection.countDocuments({
        merchant: req.user.merchant,
        widgetShown: widget._id,
      });
      const interactions = await Detection.countDocuments({
        merchant: req.user.merchant,
        widgetShown: widget._id,
        widgetInteracted: true,
      });
      const conversions = await Detection.countDocuments({
        merchant: req.user.merchant,
        widgetShown: widget._id,
        converted: true,
      });

      stats.push({
        widget: widget.name,
        impressions,
        interactions,
        conversions,
        interactionRate: (interactions / impressions) * 100,
        conversionRate: (conversions / impressions) * 100,
      });
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent trends
// @route   GET /api/dashboard/intent-trends
// @access  Private
exports.getIntentTrends = async (req, res, next) => {
  try {
    const trends = await Detection.aggregate([
      {
        $match: { merchant: req.user.merchant },
      },
      {
        $group: {
          _id: {
            intent: "$intent",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.date": 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: trends,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversion stats
// @route   GET /api/dashboard/conversion-stats
// @access  Private
exports.getConversionStats = async (req, res, next) => {
  try {
    const stats = await Detection.aggregate([
      {
        $match: { merchant: req.user.merchant },
      },
      {
        $group: {
          _id: "$intent",
          total: { $sum: 1 },
          converted: {
            $sum: { $cond: [{ $eq: ["$converted", true] }, 1, 0] },
          },
        },
      },
    ]);

    const enrichedStats = stats.map((stat) => ({
      intent: stat._id,
      total: stat.total,
      converted: stat.converted,
      conversionRate: (stat.converted / stat.total) * 100,
    }));

    res.status(200).json({
      success: true,
      data: enrichedStats,
    });
  } catch (error) {
    next(error);
  }
};

// Helper functions
async function calculateConversionRate(merchantId) {
  const totalDetections = await Detection.countDocuments({
    merchant: merchantId,
  });
  const conversions = await Detection.countDocuments({
    merchant: merchantId,
    converted: true,
  });
  return (conversions / totalDetections) * 100;
}
