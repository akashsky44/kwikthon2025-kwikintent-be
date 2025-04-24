const Merchant = require("../models/merchant.model");
const Detection = require("../models/detection.model");
const { ApiError } = require("../utils/errors");

// @desc    Get all merchants
// @route   GET /api/merchants
// @access  Private
exports.getAllMerchants = async (req, res, next) => {
  try {
    const merchants = await Merchant.find();
    res.status(200).json({
      success: true,
      data: merchants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get merchant by ID
// @route   GET /api/merchants/:id
// @access  Private
exports.getMerchantById = async (req, res, next) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    res.status(200).json({
      success: true,
      data: merchant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create merchant
// @route   POST /api/merchants
// @access  Private
exports.createMerchant = async (req, res, next) => {
  try {
    const { name, domain, platform, apiKey, apiSecret, settings } = req.body;

    // Check if merchant with same domain exists
    const existingMerchant = await Merchant.findOne({ domain });
    if (existingMerchant) {
      throw new ApiError(400, "Merchant with this domain already exists");
    }

    const merchant = await Merchant.create({
      name,
      domain,
      platform,
      apiKey,
      apiSecret,
      settings,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: merchant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update merchant
// @route   PUT /api/merchants/:id
// @access  Private
exports.updateMerchant = async (req, res, next) => {
  try {
    const { name, domain, platform, apiKey, apiSecret } = req.body;

    const merchant = await Merchant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name, domain, platform, apiKey, apiSecret },
      { new: true, runValidators: true }
    );

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    res.status(200).json({
      success: true,
      data: merchant,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete merchant
// @route   DELETE /api/merchants/:id
// @access  Private
exports.deleteMerchant = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get merchant settings
// @route   GET /api/merchants/:id/settings
// @access  Private
exports.getMerchantSettings = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    res.status(200).json({
      success: true,
      data: merchant.settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update merchant settings
// @route   PUT /api/merchants/:id/settings
// @access  Private
exports.updateMerchantSettings = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { settings: req.body },
      { new: true, runValidators: true }
    );

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    res.status(200).json({
      success: true,
      data: merchant.settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get merchant analytics
// @route   GET /api/merchants/:id/analytics
// @access  Private
exports.getMerchantAnalytics = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const analytics = await Detection.aggregate([
      {
        $match: { merchant: merchant._id },
      },
      {
        $group: {
          _id: null,
          totalDetections: { $sum: 1 },
          highIntent: {
            $sum: { $cond: [{ $eq: ["$intentType", "high-intent"] }, 1, 0] },
          },
          priceSensitive: {
            $sum: {
              $cond: [{ $eq: ["$intentType", "price-sensitive"] }, 1, 0],
            },
          },
          justBrowsing: {
            $sum: { $cond: [{ $eq: ["$intentType", "just-browsing"] }, 1, 0] },
          },
          converted: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: analytics[0] || {
        totalDetections: 0,
        highIntent: 0,
        priceSensitive: 0,
        justBrowsing: 0,
        converted: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics overview
// @route   GET /api/merchants/:id/analytics/overview
// @access  Private
exports.getAnalyticsOverview = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const overview = await Detection.aggregate([
      {
        $match: { merchant: merchant._id },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          detections: { $sum: 1 },
          conversions: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent distribution
// @route   GET /api/merchants/:id/analytics/intent-distribution
// @access  Private
exports.getIntentDistribution = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const distribution = await Detection.aggregate([
      {
        $match: { merchant: merchant._id },
      },
      {
        $group: {
          _id: "$intentType",
          count: { $sum: 1 },
          conversions: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversion rates
// @route   GET /api/merchants/:id/analytics/conversion-rates
// @access  Private
exports.getConversionRates = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const rates = await Detection.aggregate([
      {
        $match: { merchant: merchant._id },
      },
      {
        $group: {
          _id: {
            intentType: "$intentType",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          },
          total: { $sum: 1 },
          converted: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          intentType: "$_id.intentType",
          date: "$_id.date",
          total: 1,
          converted: 1,
          rate: {
            $multiply: [{ $divide: ["$converted", "$total"] }, 100],
          },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: rates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget performance
// @route   GET /api/merchants/:id/analytics/widget-performance
// @access  Private
exports.getWidgetPerformance = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const performance = await Detection.aggregate([
      {
        $match: {
          merchant: merchant._id,
          widgetShown: { $exists: true },
        },
      },
      {
        $group: {
          _id: "$widgetShown",
          shown: { $sum: 1 },
          interacted: { $sum: { $cond: ["$widgetInteracted", 1, 0] } },
          converted: { $sum: { $cond: ["$converted", 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          widgetId: "$_id",
          shown: 1,
          interacted: 1,
          converted: 1,
          interactionRate: {
            $multiply: [{ $divide: ["$interacted", "$shown"] }, 100],
          },
          conversionRate: {
            $multiply: [{ $divide: ["$converted", "$shown"] }, 100],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Integrate store
// @route   POST /api/merchants/:id/integrate
// @access  Private
exports.integrateStore = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    // Integration logic here based on platform
    const integrationResult = await integrateStore(merchant, req.body);

    res.status(200).json({
      success: true,
      data: integrationResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove integration
// @route   DELETE /api/merchants/:id/integrate
// @access  Private
exports.removeIntegration = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    // Remove integration logic here
    const result = await removeIntegration(merchant);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get integration status
// @route   GET /api/merchants/:id/integration-status
// @access  Private
exports.getIntegrationStatus = async (req, res, next) => {
  try {
    const merchant = await Merchant.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    // Get integration status logic here
    const status = await getIntegrationStatus(merchant);

    res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    next(error);
  }
};
