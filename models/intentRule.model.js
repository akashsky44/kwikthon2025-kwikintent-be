const mongoose = require("mongoose");

const behavioralSignalSchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  threshold: {
    type: Number,
    required: true,
    min: 0,
  },
});

const historicalFactorSchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const deviceContextSchema = new mongoose.Schema({
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
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const intentRuleSchema = new mongoose.Schema(
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
    threshold: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    behavioralSignals: [behavioralSignalSchema],
    historicalFactors: [historicalFactorSchema],
    deviceContext: [deviceContextSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    performance: {
      totalDetections: {
        type: Number,
        default: 0,
      },
      accurateDetections: {
        type: Number,
        default: 0,
      },
      falsePositives: {
        type: Number,
        default: 0,
      },
      falseNegatives: {
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
  },
  {
    timestamps: true,
  }
);

// Indexes
intentRuleSchema.index({ merchant: 1, intentType: 1 });
intentRuleSchema.index({ merchant: 1, isActive: 1 });
intentRuleSchema.index({ merchant: 1, createdAt: -1 });

// Methods
intentRuleSchema.methods.evaluateSignals = function (signals) {
  let totalScore = 0;
  let totalWeight = 0;

  // Evaluate behavioral signals
  this.behavioralSignals.forEach((signal) => {
    if (signal.enabled && signals[signal.name] !== undefined) {
      const value = signals[signal.name];
      if (typeof value === "boolean") {
        totalScore += value ? signal.weight : 0;
      } else if (typeof value === "number") {
        totalScore += value >= signal.threshold ? signal.weight : 0;
      }
      totalWeight += signal.weight;
    }
  });

  // Evaluate historical factors
  this.historicalFactors.forEach((factor) => {
    if (factor.enabled && signals[factor.name] !== undefined) {
      totalScore += signals[factor.name] ? factor.weight : 0;
      totalWeight += factor.weight;
    }
  });

  // Evaluate device context
  this.deviceContext.forEach((context) => {
    if (context.enabled && signals[context.name] !== undefined) {
      totalScore += signals[context.name] ? context.weight : 0;
      totalWeight += context.weight;
    }
  });

  // Calculate normalized score (0-100)
  return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
};

intentRuleSchema.methods.updatePerformance = async function (accurate) {
  this.performance.totalDetections += 1;
  if (accurate) {
    this.performance.accurateDetections += 1;
  } else {
    this.performance.falsePositives += 1;
  }
  this.performance.lastUpdated = Date.now();
  return this.save();
};

// Statics
intentRuleSchema.statics.getActiveRules = function (merchantId) {
  return this.find({
    merchant: merchantId,
    isActive: true,
  }).sort({ threshold: -1 });
};

intentRuleSchema.statics.getRulePerformance = async function (
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
        totalDetections: { $sum: "$performance.totalDetections" },
        accurateDetections: { $sum: "$performance.accurateDetections" },
        falsePositives: { $sum: "$performance.falsePositives" },
        falseNegatives: { $sum: "$performance.falseNegatives" },
      },
    },
    {
      $project: {
        _id: 0,
        totalDetections: 1,
        accurateDetections: 1,
        falsePositives: 1,
        falseNegatives: 1,
        accuracy: {
          $multiply: [
            { $divide: ["$accurateDetections", "$totalDetections"] },
            100,
          ],
        },
        precision: {
          $multiply: [
            {
              $divide: [
                "$accurateDetections",
                { $add: ["$accurateDetections", "$falsePositives"] },
              ],
            },
            100,
          ],
        },
        recall: {
          $multiply: [
            {
              $divide: [
                "$accurateDetections",
                { $add: ["$accurateDetections", "$falseNegatives"] },
              ],
            },
            100,
          ],
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalDetections: 0,
      accurateDetections: 0,
      falsePositives: 0,
      falseNegatives: 0,
      accuracy: 0,
      precision: 0,
      recall: 0,
    }
  );
};

module.exports = mongoose.model("IntentRule", intentRuleSchema);
