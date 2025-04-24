const mongoose = require("mongoose");

const intentTypeSchema = new mongoose.Schema({
  threshold: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  behavioralSignals: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      weight: Number,
      threshold: Number,
    },
  ],
  historicalFactors: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      weight: Number,
    },
  ],
  deviceContext: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      weight: Number,
    },
  ],
});

const checkoutFactorSchema = new mongoose.Schema({
  paymentMethods: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      impact: Number,
      conditions: {
        minOrderValue: Number,
        maxOrderValue: Number,
        customerTypes: [String],
        geoLocations: [String],
      },
    },
  ],
  shippingOptions: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      impact: Number,
      conditions: {
        minOrderValue: Number,
        maxOrderValue: Number,
        regions: [String],
        productCategories: [String],
      },
    },
  ],
  discountRules: [
    {
      name: String,
      description: String,
      enabled: Boolean,
      impact: Number,
      conditions: {
        type: String,
        value: Number,
        minOrderValue: Number,
        maxUsage: Number,
        expiryDate: Date,
      },
    },
  ],
});

const widgetSettingSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["urgency", "discount", "social-proof", "recommendation"],
  },
  content: {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    additionalText: String,
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
        match: [
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Please use valid hex color",
        ],
      },
      text: {
        type: String,
        match: [
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Please use valid hex color",
        ],
      },
      accent: {
        type: String,
        match: [
          /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
          "Please use valid hex color",
        ],
      },
    },
  },
});

const configurationSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    intentTypes: {
      highIntent: intentTypeSchema,
      priceSensitive: intentTypeSchema,
      justBrowsing: intentTypeSchema,
    },
    checkoutFactors: checkoutFactorSchema,
    widgetSettings: {
      highIntent: widgetSettingSchema,
      priceSensitive: widgetSettingSchema,
      justBrowsing: widgetSettingSchema,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
configurationSchema.index({ merchant: 1, isActive: 1 });
configurationSchema.index({ merchant: 1, version: -1 });
configurationSchema.index({ merchant: 1, createdAt: -1 });

// Methods
configurationSchema.methods.getIntentRules = function (intentType) {
  return this.intentTypes[intentType];
};

configurationSchema.methods.getWidgetSettings = function (intentType) {
  return this.widgetSettings[intentType];
};

configurationSchema.methods.getCheckoutFactors = function () {
  return this.checkoutFactors;
};

// Statics
configurationSchema.statics.getActiveConfig = function (merchantId) {
  return this.findOne({
    merchant: merchantId,
    isActive: true,
  }).sort({ version: -1 });
};

configurationSchema.statics.getConfigHistory = function (merchantId) {
  return this.find({
    merchant: merchantId,
  }).sort({ version: -1 });
};

// Pre-save hook to increment version
configurationSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastConfig = await this.constructor
      .findOne({
        merchant: this.merchant,
      })
      .sort({ version: -1 });

    if (lastConfig) {
      this.version = lastConfig.version + 1;
    }
  }
  next();
});

// Pre-save hook to deactivate old configs
configurationSchema.pre("save", async function (next) {
  if (this.isNew && this.isActive) {
    await this.constructor.updateMany(
      {
        merchant: this.merchant,
        _id: { $ne: this._id },
      },
      {
        isActive: false,
      }
    );
  }
  next();
});

module.exports = mongoose.model("Configuration", configurationSchema);
