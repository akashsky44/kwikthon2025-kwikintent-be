const IntentRule = require("../models/intentRule.model");
const { ApiError } = require("../utils/errors");

// @desc    Get all intent rules
// @route   GET /api/intent-rules
// @access  Private
exports.getAllRules = async (req, res, next) => {
  try {
    console.log("Fetching all intent rules for merchant:", req.user.merchant);
    const rules = await IntentRule.find({ merchant: req.user.merchant });
    res.status(200).json({
      success: true,
      data: rules,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent rule by type
// @route   GET /api/intent-rules/:type
// @access  Private
exports.getRuleByType = async (req, res, next) => {
  try {
    const rule = await IntentRule.findOne({
      merchant: req.user.merchant,
      intentType: req.params.type,
    }).populate("merchant", "name domain");

    if (!rule) {
      throw new ApiError(404, "Intent rule not found");
    }

    res.status(200).json({
      success: true,
      data: rule,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create intent rule
// @route   POST /api/intent-rules
// @access  Private
exports.createRule = async (req, res, next) => {
  try {
    const {
      intentType,
      threshold,
      behavioralSignals,
      historicalFactors,
      deviceContext,
    } = req.body;

    // Check if rule already exists
    const existingRule = await IntentRule.findOne({
      merchant: req.user.merchant,
      intentType,
    });

    if (existingRule) {
      throw new ApiError(400, "Intent rule already exists");
    }

    const rule = await IntentRule.create({
      merchant: req.user.merchant,
      intentType,
      threshold,
      behavioralSignals,
      historicalFactors,
      deviceContext,
    });

    // Populate merchant details
    await rule.populate("merchant", "name domain");

    res.status(201).json({
      success: true,
      data: rule,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update intent rule
// @route   PUT /api/intent-rules/:type
// @access  Private
exports.updateRule = async (req, res, next) => {
  try {
    const { threshold, behavioralSignals, historicalFactors, deviceContext } =
      req.body;

    const rule = await IntentRule.findOneAndUpdate(
      {
        merchant: req.user.merchant,
        intentType: req.params.type,
      },
      {
        threshold,
        behavioralSignals,
        historicalFactors,
        deviceContext,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!rule) {
      throw new ApiError(404, "Intent rule not found");
    }

    res.status(200).json({
      success: true,
      data: rule,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete intent rule
// @route   DELETE /api/intent-rules/:type
// @access  Private
exports.deleteRule = async (req, res, next) => {
  try {
    const rule = await IntentRule.findOneAndDelete({
      merchant: req.user.merchant,
      intentType: req.params.type,
    });

    if (!rule) {
      throw new ApiError(404, "Intent rule not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
