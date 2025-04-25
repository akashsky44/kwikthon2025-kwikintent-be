const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema(
  {
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    settings: {
      widgetPlacement: {
        type: String,
        enum: ["below-price", "above-button"],
        default: "below-price",
      },
      intentThresholds: {
        highIntent: {
          type: Number,
          min: 0,
          max: 100,
          default: 70,
        },
        priceSensitive: {
          type: Number,
          min: 0,
          max: 100,
          default: 50,
        },
        justBrowsing: {
          type: Number,
          min: 0,
          max: 100,
          default: 30,
        },
      },
      widgetStyles: {
        colors: {
          primary: {
            type: String,
            default: "#e53e3e",
            match: [
              /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              "Please use valid hex color",
            ],
          },
          secondary: {
            type: String,
            default: "#fff5f7",
            match: [
              /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              "Please use valid hex color",
            ],
          },
          text: {
            type: String,
            default: "#1a202c",
            match: [
              /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
              "Please use valid hex color",
            ],
          },
        },
        fonts: {
          family: {
            type: String,
            default: "system-ui",
          },
          size: {
            type: String,
            default: "14px",
          },
        },
      },
      features: {
        stockCounter: {
          type: Boolean,
          default: true,
        },
        countdown: {
          type: Boolean,
          default: true,
        },
        socialProof: {
          type: Boolean,
          default: true,
        },
        recentActivity: {
          type: Boolean,
          default: true,
        },
      },
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
