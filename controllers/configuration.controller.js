const Configuration = require("../models/configuration.model");
const { ApiError } = require("../utils/errors");

// @desc    Create new configuration
// @route   POST /api/configuration
// @access  Private
exports.createConfig = async (req, res, next) => {
  try {
    const config = await Configuration.create({
      merchant: req.user.merchant,
      settings: req.body.settings,
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
    const config = await Configuration.getActiveConfig(req.user.merchant);

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
    const configs = await Configuration.getConfigHistory(req.user.merchant);

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
      { _id: req.params.id, merchant: req.user.merchant },
      { settings: req.body.settings },
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
      merchant: req.user.merchant,
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

// @desc    Export configuration
// @route   GET /api/configuration/export
// @access  Private
exports.exportConfiguration = async (req, res, next) => {
  try {
    const config = await Configuration.getActiveConfig(req.user.merchant);

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

// @desc    Import configuration
// @route   POST /api/configuration/import
// @access  Private
exports.importConfiguration = async (req, res, next) => {
  try {
    const config = await Configuration.create({
      merchant: req.user.merchant,
      settings: req.body.settings,
    });

    res.status(201).json({
      success: true,
      data: config,
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
    // Validate settings structure and values
    const { settings } = req.body;
    const errors = [];

    // Validate widget placement
    if (
      !settings.widgetPlacement ||
      !["below-price", "above-button"].includes(settings.widgetPlacement)
    ) {
      errors.push("Invalid widget placement");
    }

    // Validate intent thresholds
    if (!settings.intentThresholds) {
      errors.push("Intent thresholds are required");
    } else {
      const thresholdTypes = ["highIntent", "priceSensitive", "justBrowsing"];
      thresholdTypes.forEach((type) => {
        if (
          typeof settings.intentThresholds[type] !== "number" ||
          settings.intentThresholds[type] < 0 ||
          settings.intentThresholds[type] > 100
        ) {
          errors.push(`Invalid ${type} threshold`);
        }
      });
    }

    // Validate widget styles
    if (!settings.widgetStyles) {
      errors.push("Widget styles are required");
    } else {
      // Validate colors
      if (!settings.widgetStyles.colors) {
        errors.push("Widget colors are required");
      } else {
        const colorTypes = ["primary", "secondary", "text"];
        colorTypes.forEach((type) => {
          const color = settings.widgetStyles.colors[type];
          if (!color || !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
            errors.push(`Invalid ${type} color`);
          }
        });
      }

      // Validate fonts
      if (!settings.widgetStyles.fonts) {
        errors.push("Widget fonts are required");
      } else {
        if (!settings.widgetStyles.fonts.family) {
          errors.push("Font family is required");
        }
        if (!settings.widgetStyles.fonts.size) {
          errors.push("Font size is required");
        }
      }
    }

    // Validate features
    if (!settings.features) {
      errors.push("Features configuration is required");
    } else {
      const featureTypes = [
        "stockCounter",
        "countdown",
        "socialProof",
        "recentActivity",
      ];
      featureTypes.forEach((feature) => {
        if (typeof settings.features[feature] !== "boolean") {
          errors.push(`Invalid ${feature} setting`);
        }
      });
    }

    res.status(200).json({
      success: errors.length === 0,
      errors,
    });
  } catch (error) {
    next(error);
  }
};
