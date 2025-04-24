const mongoose = require("mongoose");

const strategySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const intentStrategySchema = new mongoose.Schema({
  intentType: {
    type: String,
    required: true,
    enum: [
      "high-intent",
      "price-sensitive",
      "cart-abandoner",
      "first-time-visitor",
    ],
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  strategy: {
    type: String,
    required: true,
  },
});

const checkoutFactorSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    factorType: {
      type: String,
      required: true,
      enum: [
        "payment-friction",
        "shipping-concerns",
        "trust-concerns",
        "price-sensitivity",
        "urgency",
        "social-proof",
      ],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    impact: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    intentStrategies: [intentStrategySchema],
    strategies: {
      type: Map,
      of: strategySchema,
    },
    performance: {
      impressions: {
        type: Number,
        default: 0,
      },
      interactions: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    displayRules: {
      minOrderValue: {
        type: Number,
        min: 0,
      },
      maxOrderValue: {
        type: Number,
        min: 0,
      },
      customerTypes: [
        {
          type: String,
          enum: ["new", "returning", "vip"],
        },
      ],
      geoLocations: [
        {
          type: String,
        },
      ],
      deviceTypes: [
        {
          type: String,
          enum: ["mobile", "tablet", "desktop"],
        },
      ],
      timeRestrictions: {
        startTime: String,
        endTime: String,
        daysOfWeek: [
          {
            type: String,
            enum: [
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ],
          },
        ],
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
checkoutFactorSchema.index({ merchant: 1, factorType: 1 });
checkoutFactorSchema.index({ merchant: 1, enabled: 1 });
checkoutFactorSchema.index({ merchant: 1, impact: -1 });
checkoutFactorSchema.index({ merchant: 1, createdAt: -1 });

// Methods
checkoutFactorSchema.methods.incrementImpressions = async function () {
  this.performance.impressions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

checkoutFactorSchema.methods.incrementInteractions = async function () {
  this.performance.interactions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

checkoutFactorSchema.methods.incrementConversions = async function () {
  this.performance.conversions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

// Statics
checkoutFactorSchema.statics.getFactorsByIntent = async function (
  merchantId,
  intentType
) {
  return this.find({
    merchant: merchantId,
    enabled: true,
    "intentStrategies.intentType": intentType,
    "intentStrategies.enabled": true,
  }).sort({ impact: -1 });
};

checkoutFactorSchema.statics.getPerformanceStats = async function (merchantId) {
  const stats = await this.aggregate([
    {
      $match: {
        merchant: merchantId,
      },
    },
    {
      $group: {
        _id: "$factorType",
        totalImpressions: { $sum: "$performance.impressions" },
        totalInteractions: { $sum: "$performance.interactions" },
        totalConversions: { $sum: "$performance.conversions" },
        factors: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        factorType: "$_id",
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
        factors: {
          $map: {
            input: "$factors",
            as: "factor",
            in: {
              id: "$$factor._id",
              name: "$$factor.name",
              impact: "$$factor.impact",
              impressions: "$$factor.performance.impressions",
              interactions: "$$factor.performance.interactions",
              conversions: "$$factor.performance.conversions",
            },
          },
        },
      },
    },
  ]);

  return stats;
};

module.exports = mongoose.model("CheckoutFactor", checkoutFactorSchema);
