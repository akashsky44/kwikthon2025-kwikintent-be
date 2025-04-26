const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    intentType: {
      type: String,
      required: true,
      enum: ["high-intent", "price-sensitive", "just-browsing"],
    },
    widgetType: {
      type: String,
      required: true,
      enum: [
        "urgency",
        "payment-options",
        "bundle",
        "information",
        "discount",
        "social-proof",
        "recommendation",
      ],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    content: {
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"],
      },
      message: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, "Message cannot be more than 200 characters"],
      },
      additionalText: {
        type: String,
        trim: true,
        maxlength: [100, "Additional text cannot be more than 100 characters"],
      },
    },
    styling: {
      position: {
        type: String,
        required: true,
        enum: [
          "above-price",
          "below-price",
          "above-add-to-cart",
          "below-add-to-cart",
        ],
      },
      colors: {
        background: {
          type: String,
          required: true,
          match: [
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Please provide a valid hex color",
          ],
        },
        text: {
          type: String,
          required: true,
          match: [
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Please provide a valid hex color",
          ],
        },
        accent: {
          type: String,
          required: true,
          match: [
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Please provide a valid hex color",
          ],
        },
      },
      showIcons: {
        type: Boolean,
        default: true,
      },
    },
    settings: {
      showCountdown: {
        type: Boolean,
        default: false,
      },
      countdownDuration: {
        type: Number,
        min: 0,
        default: 0,
      },
      showStockLevel: {
        type: Boolean,
        default: false,
      },
      showRecentActivity: {
        type: Boolean,
        default: false,
      },
      discountType: {
        type: String,
        enum: ["percentage", "fixed", "shipping", null],
        default: null,
      },
      discountValue: {
        type: Number,
        min: 0,
        default: 0,
      },
      oneTimeUse: {
        type: Boolean,
        default: false,
      },
      showOriginalPrice: {
        type: Boolean,
        default: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayRules: {
      minPrice: {
        type: Number,
        min: 0,
      },
      maxPrice: {
        type: Number,
        min: 0,
      },
      categories: [
        {
          type: String,
        },
      ],
      excludedProducts: [
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
      geoLocations: [
        {
          type: String,
        },
      ],
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
widgetSchema.index({ merchant: 1, intentType: 1 });
widgetSchema.index({ merchant: 1, widgetType: 1 });
widgetSchema.index({ merchant: 1, isActive: 1 });
widgetSchema.index({ merchant: 1, createdAt: -1 });

// Methods
widgetSchema.methods.incrementImpressions = async function () {
  this.performance.impressions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

widgetSchema.methods.incrementInteractions = async function () {
  this.performance.interactions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

widgetSchema.methods.incrementConversions = async function () {
  this.performance.conversions += 1;
  this.performance.lastUpdated = Date.now();
  return this.save();
};

// Statics
widgetSchema.statics.getPerformanceStats = async function (merchantId) {
  const stats = await this.aggregate([
    {
      $match: {
        merchant: merchantId,
      },
    },
    {
      $group: {
        _id: "$intentType",
        totalImpressions: { $sum: "$performance.impressions" },
        totalInteractions: { $sum: "$performance.interactions" },
        totalConversions: { $sum: "$performance.conversions" },
        widgets: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        intentType: "$_id",
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
        widgets: {
          $map: {
            input: "$widgets",
            as: "widget",
            in: {
              id: "$$widget._id",
              name: "$$widget.name",
              widgetType: "$$widget.widgetType",
              impressions: "$$widget.performance.impressions",
              interactions: "$$widget.performance.interactions",
              conversions: "$$widget.performance.conversions",
            },
          },
        },
      },
    },
  ]);

  return stats;
};

module.exports = mongoose.model("Widget", widgetSchema);
