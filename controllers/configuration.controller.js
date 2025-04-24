const Configuration = require("../models/configuration.model");
const IntentRule = require("../models/intentRule.model");
const { ApiError } = require("../utils/errors");

// @desc    Create new configuration
// @route   POST /api/configuration
// @access  Private
exports.createConfig = async (req, res, next) => {
  try {
    const config = await Configuration.create({
      ...req.body,
      merchant: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get active configuration
// @route   GET /api/configuration
// @access  Private
exports.getActiveConfig = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get configuration history
// @route   GET /api/configuration/history
// @access  Private
exports.getConfigHistory = async (req, res, next) => {
  try {
    const configs = await Configuration.getConfigHistory(req.user.id);

    res.status(200).json({
      success: true,
      data: configs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update configuration
// @route   PUT /api/configuration/:id
// @access  Private
exports.updateConfig = async (req, res, next) => {
  try {
    const config = await Configuration.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!config) {
      throw new ApiError(404, "Configuration not found");
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete configuration
// @route   DELETE /api/configuration/:id
// @access  Private
exports.deleteConfig = async (req, res, next) => {
  try {
    const config = await Configuration.findOneAndDelete({
      _id: req.params.id,
      merchant: req.user.id,
    });

    if (!config) {
      throw new ApiError(404, "Configuration not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all intent rules
// @route   GET /api/configuration/intent-rules
// @access  Private
exports.getAllIntentRules = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.intentTypes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent rules by type
// @route   GET /api/configuration/intent-rules/:type
// @access  Private
exports.getIntentRulesByType = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    const rules = config.getIntentRules(req.params.type);
    if (!rules) {
      throw new ApiError(404, "Intent rules not found for this type");
    }

    res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update intent rules
// @route   PUT /api/configuration/intent-rules/:type
// @access  Private
exports.updateIntentRules = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.intentTypes[req.params.type] = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.intentTypes[req.params.type],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent rule performance
// @route   GET /api/configuration/intent-rules/:type/performance
// @access  Private
exports.getIntentRulePerformance = async (req, res, next) => {
  try {
    const performance = await IntentRule.getRulePerformance(
      req.user.id,
      req.params.type
    );

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all widget settings
// @route   GET /api/configuration/widget-settings
// @access  Private
exports.getAllWidgetSettings = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.widgetSettings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget settings by type
// @route   GET /api/configuration/widget-settings/:type
// @access  Private
exports.getWidgetSettingsByType = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    const settings = config.getWidgetSettings(req.params.type);
    if (!settings) {
      throw new ApiError(404, "Widget settings not found for this type");
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update widget settings
// @route   PUT /api/configuration/widget-settings/:type
// @access  Private
exports.updateWidgetSettings = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.widgetSettings[req.params.type] = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.widgetSettings[req.params.type],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget setting performance
// @route   GET /api/configuration/widget-settings/:type/performance
// @access  Private
exports.getWidgetSettingPerformance = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    // Calculate widget performance metrics
    const performance = {
      impressions: 0,
      interactions: 0,
      conversions: 0,
      interactionRate: 0,
      conversionRate: 0,
    };

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all checkout factors
// @route   GET /api/configuration/checkout-factors
// @access  Private
exports.getAllCheckoutFactors = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.checkoutFactors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checkout factors by type
// @route   GET /api/configuration/checkout-factors/:type
// @access  Private
exports.getCheckoutFactorsByType = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    const factors = config.getCheckoutFactors()[req.params.type];
    if (!factors) {
      throw new ApiError(404, "Checkout factors not found for this type");
    }

    res.status(200).json({
      success: true,
      data: factors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update checkout factors
// @route   PUT /api/configuration/checkout-factors/:type
// @access  Private
exports.updateCheckoutFactors = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.checkoutFactors[req.params.type] = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.checkoutFactors[req.params.type],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checkout factor performance
// @route   GET /api/configuration/checkout-factors/:type/performance
// @access  Private
exports.getCheckoutFactorPerformance = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    // Calculate checkout factor performance metrics
    const performance = {
      totalOrders: 0,
      completedOrders: 0,
      abandonedOrders: 0,
      completionRate: 0,
      averageOrderValue: 0,
    };

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics overview
// @route   GET /api/configuration/analytics/overview
// @access  Private
exports.getAnalyticsOverview = async (req, res, next) => {
  try {
    // Calculate overall analytics metrics
    const overview = {
      totalVisitors: 0,
      uniqueVisitors: 0,
      totalConversions: 0,
      conversionRate: 0,
      averageOrderValue: 0,
    };

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent distribution
// @route   GET /api/configuration/analytics/intent-distribution
// @access  Private
exports.getIntentDistribution = async (req, res, next) => {
  try {
    // Calculate intent distribution metrics
    const distribution = {
      highIntent: 0,
      priceSensitive: 0,
      justBrowsing: 0,
      total: 0,
    };

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversion rates
// @route   GET /api/configuration/analytics/conversion-rates
// @access  Private
exports.getConversionRates = async (req, res, next) => {
  try {
    // Calculate conversion rate metrics
    const rates = {
      overall: 0,
      byIntent: {
        highIntent: 0,
        priceSensitive: 0,
        justBrowsing: 0,
      },
      byWidget: {},
      byCheckoutFactor: {},
    };

    res.status(200).json({
      success: true,
      data: rates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget performance
// @route   GET /api/configuration/analytics/widget-performance
// @access  Private
exports.getWidgetPerformance = async (req, res, next) => {
  try {
    // Calculate widget performance metrics
    const performance = {
      overall: {
        impressions: 0,
        interactions: 0,
        conversions: 0,
      },
      byType: {},
    };

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checkout performance
// @route   GET /api/configuration/analytics/checkout-performance
// @access  Private
exports.getCheckoutPerformance = async (req, res, next) => {
  try {
    // Calculate checkout performance metrics
    const performance = {
      overall: {
        attempts: 0,
        completions: 0,
        abandonments: 0,
      },
      byFactor: {},
    };

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export configuration
// @route   GET /api/configuration/export
// @access  Private
exports.exportConfiguration = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export intent rules
// @route   GET /api/configuration/export/intent-rules
// @access  Private
exports.exportIntentRules = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.intentTypes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export widget settings
// @route   GET /api/configuration/export/widget-settings
// @access  Private
exports.exportWidgetSettings = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.widgetSettings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export checkout factors
// @route   GET /api/configuration/export/checkout-factors
// @access  Private
exports.exportCheckoutFactors = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    res.status(200).json({
      success: true,
      data: config.checkoutFactors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Import configuration
// @route   POST /api/configuration/import
// @access  Private
exports.importConfiguration = async (req, res, next) => {
  try {
    const config = await Configuration.create({
      ...req.body,
      merchant: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: config,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Import intent rules
// @route   POST /api/configuration/import/intent-rules
// @access  Private
exports.importIntentRules = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.intentTypes = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.intentTypes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Import widget settings
// @route   POST /api/configuration/import/widget-settings
// @access  Private
exports.importWidgetSettings = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.widgetSettings = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.widgetSettings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Import checkout factors
// @route   POST /api/configuration/import/checkout-factors
// @access  Private
exports.importCheckoutFactors = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.id);

    if (!config) {
      throw new ApiError(404, "No active configuration found");
    }

    config.checkoutFactors = req.body;
    await config.save();

    res.status(200).json({
      success: true,
      data: config.checkoutFactors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate configuration
// @route   POST /api/configuration/validate
// @access  Private
exports.validateConfiguration = async (req, res, next) => {
  try {
    const config = new Configuration({
      ...req.body,
      merchant: req.user.id,
    });

    await config.validate();

    res.status(200).json({
      success: true,
      message: "Configuration is valid",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate intent rules
// @route   POST /api/configuration/validate/intent-rules
// @access  Private
exports.validateIntentRules = async (req, res, next) => {
  try {
    const config = new Configuration({
      merchant: req.user.id,
      intentTypes: req.body,
    });

    await config.validate("intentTypes");

    res.status(200).json({
      success: true,
      message: "Intent rules are valid",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate widget settings
// @route   POST /api/configuration/validate/widget-settings
// @access  Private
exports.validateWidgetSettings = async (req, res, next) => {
  try {
    const config = new Configuration({
      merchant: req.user.id,
      widgetSettings: req.body,
    });

    await config.validate("widgetSettings");

    res.status(200).json({
      success: true,
      message: "Widget settings are valid",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate checkout factors
// @route   POST /api/configuration/validate/checkout-factors
// @access  Private
exports.validateCheckoutFactors = async (req, res, next) => {
  try {
    const config = new Configuration({
      merchant: req.user.id,
      checkoutFactors: req.body,
    });

    await config.validate("checkoutFactors");

    res.status(200).json({
      success: true,
      message: "Checkout factors are valid",
    });
  } catch (error) {
    next(error);
  }
};
