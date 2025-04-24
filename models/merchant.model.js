const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const merchantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    domain: {
      type: String,
      required: [true, "Please add a domain"],
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
        "Please add a valid domain",
      ],
    },
    platform: {
      type: String,
      required: [true, "Please add a platform"],
      enum: ["shopify", "woocommerce", "magento", "custom"],
    },
    apiKey: {
      type: String,
      required: [true, "Please add an API key"],
    },
    apiSecret: {
      type: String,
      required: [true, "Please add an API secret"],
    },
    settings: {
      widgetPlacement: {
        type: String,
        enum: [
          "above-price",
          "below-price",
          "above-add-to-cart",
          "below-add-to-cart",
        ],
        default: "below-price",
      },
      intentThresholds: {
        highIntent: {
          type: Number,
          default: 70,
          min: 0,
          max: 100,
        },
        priceSensitive: {
          type: Number,
          default: 50,
          min: 0,
          max: 100,
        },
        justBrowsing: {
          type: Number,
          default: 30,
          min: 0,
          max: 100,
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
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
merchantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
merchantSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in database
merchantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
merchantSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// Cascade delete widgets and other related data when a merchant is removed
merchantSchema.pre("remove", async function (next) {
  await this.model("Widget").deleteMany({ merchant: this._id });
  await this.model("Detection").deleteMany({ merchant: this._id });
  await this.model("CheckoutFactor").deleteMany({ merchant: this._id });
  next();
});

// Indexes
merchantSchema.index({ domain: 1 });
merchantSchema.index({ platform: 1 });
merchantSchema.index({ isActive: 1 });
merchantSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Merchant", merchantSchema);
