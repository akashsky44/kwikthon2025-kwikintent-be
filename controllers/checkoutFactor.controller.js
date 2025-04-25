const CheckoutFactor = require("../models/checkoutFactor.model");
const { ApiError } = require("../utils/errors");

// @desc    Create a new checkout factor
// @route   POST /api/checkout-factors
// @access  Private
exports.createFactor = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.create({
      ...req.body,
      merchant: req.user.merchant,
    });

    res.status(201).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all checkout factors
// @route   GET /api/checkout-factors
// @access  Private
exports.getAllFactors = async (req, res, next) => {
  try {
    const factors = await CheckoutFactor.find({ merchant: req.user.merchant });

    res.status(200).json({
      success: true,
      data: factors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get checkout factor by ID
// @route   GET /api/checkout-factors/:id
// @access  Private
exports.getFactorById = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    });

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update checkout factor
// @route   PUT /api/checkout-factors/:id
// @access  Private
exports.updateFactor = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      req.body,
      { new: true, runValidators: true }
    );

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete checkout factor
// @route   DELETE /api/checkout-factors/:id
// @access  Private
exports.deleteFactor = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOneAndDelete({
      _id: req.params.id,
      merchant: req.user.merchant,
    });

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Activate checkout factor
// @route   PUT /api/checkout-factors/:id/activate
// @access  Private
exports.activateFactor = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { enabled: true },
      { new: true }
    );

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate checkout factor
// @route   PUT /api/checkout-factors/:id/deactivate
// @access  Private
exports.deactivateFactor = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { enabled: false },
      { new: true }
    );

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update factor strategies
// @route   PUT /api/checkout-factors/:id/strategies
// @access  Private
exports.updateStrategies = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { strategies: req.body },
      { new: true, runValidators: true }
    );

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get factor performance stats
// @route   GET /api/checkout-factors/:id/performance
// @access  Private
exports.getFactorPerformance = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    });

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    res.status(200).json({
      success: true,
      data: factor.performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get factor interactions
// @route   GET /api/checkout-factors/:id/interactions
// @access  Private
exports.getFactorInteractions = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    });

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    const interactionRate =
      factor.performance.impressions > 0
        ? (factor.performance.interactions / factor.performance.impressions) *
          100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        impressions: factor.performance.impressions,
        interactions: factor.performance.interactions,
        interactionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get factor conversion rate
// @route   GET /api/checkout-factors/:id/conversion-rate
// @access  Private
exports.getFactorConversionRate = async (req, res, next) => {
  try {
    const factor = await CheckoutFactor.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    });

    if (!factor) {
      throw new ApiError(404, "Checkout factor not found");
    }

    const conversionRate =
      factor.performance.impressions > 0
        ? (factor.performance.conversions / factor.performance.impressions) *
          100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        impressions: factor.performance.impressions,
        conversions: factor.performance.conversions,
        conversionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get factors by type
// @route   GET /api/checkout-factors/types/:type
// @access  Private
exports.getFactorsByType = async (req, res, next) => {
  try {
    const factors = await CheckoutFactor.find({
      merchant: req.user.merchant,
      factorType: req.params.type,
    });

    res.status(200).json({
      success: true,
      data: factors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get type performance
// @route   GET /api/checkout-factors/types/:type/performance
// @access  Private
exports.getTypePerformance = async (req, res, next) => {
  try {
    const stats = await CheckoutFactor.aggregate([
      {
        $match: {
          merchant: req.user.merchant,
          factorType: req.params.type,
        },
      },
      {
        $group: {
          _id: null,
          totalImpressions: { $sum: "$performance.impressions" },
          totalInteractions: { $sum: "$performance.interactions" },
          totalConversions: { $sum: "$performance.conversions" },
        },
      },
      {
        $project: {
          _id: 0,
          totalImpressions: 1,
          totalInteractions: 1,
          totalConversions: 1,
          interactionRate: {
            $multiply: [
              { $divide: ["$totalInteractions", "$totalImpressions"] },
              100,
            ],
          },
          conversionRate: {
            $multiply: [
              { $divide: ["$totalConversions", "$totalImpressions"] },
              100,
            ],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalImpressions: 0,
        totalInteractions: 0,
        totalConversions: 0,
        interactionRate: 0,
        conversionRate: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get factors by intent
// @route   GET /api/checkout-factors/intent/:intentType
// @access  Private
exports.getFactorsByIntent = async (req, res, next) => {
  try {
    const factors = await CheckoutFactor.getFactorsByIntent(
      req.user.merchant,
      req.params.intentType
    );

    res.status(200).json({
      success: true,
      data: factors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent performance
// @route   GET /api/checkout-factors/intent/:intentType/performance
// @access  Private
exports.getIntentPerformance = async (req, res, next) => {
  try {
    const stats = await CheckoutFactor.aggregate([
      {
        $match: {
          merchant: req.user.merchant,
          "intentStrategies.intentType": req.params.intentType,
          "intentStrategies.enabled": true,
        },
      },
      {
        $group: {
          _id: null,
          totalImpressions: { $sum: "$performance.impressions" },
          totalInteractions: { $sum: "$performance.interactions" },
          totalConversions: { $sum: "$performance.conversions" },
        },
      },
      {
        $project: {
          _id: 0,
          totalImpressions: 1,
          totalInteractions: 1,
          totalConversions: 1,
          interactionRate: {
            $multiply: [
              { $divide: ["$totalInteractions", "$totalImpressions"] },
              100,
            ],
          },
          conversionRate: {
            $multiply: [
              { $divide: ["$totalConversions", "$totalImpressions"] },
              100,
            ],
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalImpressions: 0,
        totalInteractions: 0,
        totalConversions: 0,
        interactionRate: 0,
        conversionRate: 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create multiple checkout factors
// @route   POST /api/checkout-factors/bulk-create
// @access  Private
exports.createMultipleFactors = async (req, res, next) => {
  try {
    const factors = req.body.map((factor) => ({
      ...factor,
      merchant: req.user.merchant,
    }));

    const createdFactors = await CheckoutFactor.insertMany(factors);

    res.status(201).json({
      success: true,
      data: createdFactors,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update multiple checkout factors
// @route   PUT /api/checkout-factors/bulk-update
// @access  Private
exports.updateMultipleFactors = async (req, res, next) => {
  try {
    const updates = req.body.map(async ({ id, ...update }) => {
      return CheckoutFactor.findOneAndUpdate(
        { _id: id, merchant: req.user.merchant },
        update,
        { new: true, runValidators: true }
      );
    });

    const updatedFactors = await Promise.all(updates);

    res.status(200).json({
      success: true,
      data: updatedFactors.filter((factor) => factor !== null),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete multiple checkout factors
// @route   DELETE /api/checkout-factors/bulk-delete
// @access  Private
exports.deleteMultipleFactors = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await CheckoutFactor.deleteMany({
      _id: { $in: ids },
      merchant: req.user.merchant,
    });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};
