const mongoose = require("mongoose");

const detectionSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    product: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
    },
    behavioralSignals: {
      timeOnPage: {
        type: Number,
        required: true,
      },
      scrollDepth: {
        type: Number,
        required: true,
      },
      imageViews: {
        type: Number,
        default: 0,
      },
      addToCartHover: {
        type: Boolean,
        default: false,
      },
      priceViewDuration: {
        type: Number,
        default: 0,
      },
      comparisonViews: {
        type: Boolean,
        default: false,
      },
      previousAbandonment: {
        type: Boolean,
        default: false,
      },
      exitOnCheckout: {
        type: Boolean,
        default: false,
      },
      productInteraction: {
        type: Boolean,
        default: false,
      },
      categoryViews: {
        type: Number,
        default: 0,
      },
    },
    deviceInfo: {
      type: {
        type: String,
        required: true,
        enum: ["mobile", "tablet", "desktop"],
      },
      userAgent: {
        type: String,
        required: true,
      },
      screenSize: {
        type: String,
        required: true,
      },
    },
    intentScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    intentType: {
      type: String,
      required: true,
      enum: ["high-intent", "price-sensitive", "just-browsing"],
    },
    widgetShown: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Widget",
    },
    widgetInteracted: {
      type: Boolean,
      default: false,
    },
    widgetInteractionType: {
      type: String,
      enum: ["click", "hover", "dismiss"],
    },
    widgetInteractionTime: {
      type: Date,
    },
    converted: {
      type: Boolean,
      default: false,
    },
    conversionType: {
      type: String,
      enum: ["purchase", "add_to_cart", "wishlist", "email_signup"],
    },
    conversionValue: {
      type: Number,
    },
    conversionTime: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 30 * 24 * 60 * 60, // Expire documents after 30 days
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
detectionSchema.index({ merchant: 1, createdAt: -1 });
detectionSchema.index({ merchant: 1, intentType: 1 });
detectionSchema.index({ merchant: 1, widgetShown: 1 });
detectionSchema.index({ merchant: 1, converted: 1 });
detectionSchema.index({ merchant: 1, "product.id": 1 });
detectionSchema.index({ visitorId: 1, createdAt: -1 });
detectionSchema.index({ sessionId: 1 }, { unique: true });

// Methods
detectionSchema.methods.updateConversion = async function (type, value) {
  this.converted = true;
  this.conversionType = type;
  this.conversionValue = value;
  this.conversionTime = Date.now();
  return this.save();
};

detectionSchema.methods.updateWidgetInteraction = async function (type) {
  this.widgetInteracted = true;
  this.widgetInteractionType = type;
  this.widgetInteractionTime = Date.now();
  return this.save();
};

// Statics
detectionSchema.statics.getConversionRate = async function (
  merchantId,
  intentType
) {
  const stats = await this.aggregate([
    {
      $match: {
        merchant: merchantId,
        intentType: intentType,
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        converted: { $sum: { $cond: ["$converted", 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        conversionRate: {
          $multiply: [{ $divide: ["$converted", "$total"] }, 100],
        },
      },
    },
  ]);

  return stats.length > 0 ? stats[0].conversionRate : 0;
};

detectionSchema.statics.getWidgetPerformance = async function (
  merchantId,
  widgetId
) {
  const stats = await this.aggregate([
    {
      $match: {
        merchant: merchantId,
        widgetShown: widgetId,
      },
    },
    {
      $group: {
        _id: null,
        shown: { $sum: 1 },
        interacted: { $sum: { $cond: ["$widgetInteracted", 1, 0] } },
        converted: { $sum: { $cond: ["$converted", 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
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

  return stats.length > 0
    ? stats[0]
    : {
        shown: 0,
        interacted: 0,
        converted: 0,
        interactionRate: 0,
        conversionRate: 0,
      };
};

module.exports = mongoose.model("Detection", detectionSchema);
