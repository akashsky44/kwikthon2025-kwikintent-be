require("dotenv").config();
const mongoose = require("mongoose");
const Merchant = require("../models/merchant.model");
const User = require("../models/user.model");
const IntentRule = require("../models/intentRule.model");
const Widget = require("../models/widget.model");
const Detection = require("../models/detection.model");
const Configuration = require("../models/configuration.model");
const CheckoutFactor = require("../models/checkoutFactor.model");

const merchants = require("./merchants");
const users = require("./users");
const intentRules = require("./intentRules");
const widgets = require("./widgets");
const detections = require("./detections");
const configurations = require("./configurations");
const checkoutFactors = require("./checkoutFactors");

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      Merchant.deleteMany({}),
      User.deleteMany({}),
      IntentRule.deleteMany({}),
      Widget.deleteMany({}),
      Detection.deleteMany({}),
      Configuration.deleteMany({}),
      CheckoutFactor.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create demo merchant
    const demoMerchant = await Merchant.create(merchants[0]);
    console.log("Created demo merchant");

    // Create users with merchant reference
    const usersWithMerchant = users.map((user) => ({
      ...user,
      merchant: demoMerchant._id,
    }));
    await User.create(usersWithMerchant);
    console.log("Created users");

    // Create intent rules for demo merchant
    const intentRulesWithMerchant = intentRules.map((rule) => ({
      ...rule,
      merchant: demoMerchant._id,
    }));
    await IntentRule.create(intentRulesWithMerchant);
    console.log("Created intent rules");

    // Create widgets for demo merchant
    const widgetsWithMerchant = widgets.map((widget) => ({
      ...widget,
      merchant: demoMerchant._id,
    }));
    await Widget.create(widgetsWithMerchant);
    console.log("Created widgets");

    // Create sample detections
    const detectionsWithMerchant = detections.map((detection) => ({
      ...detection,
      merchant: demoMerchant._id,
    }));
    await Detection.create(detectionsWithMerchant);
    console.log("Created sample detections");

    // Create configuration for demo merchant
    const configWithMerchant = {
      ...configurations[0],
      merchant: demoMerchant._id,
    };
    await Configuration.create(configWithMerchant);
    console.log("Created configuration");

    // Create checkout factors for demo merchant
    const checkoutFactorsWithMerchant = checkoutFactors.map((factor) => ({
      ...factor,
      merchant: demoMerchant._id,
    }));
    await CheckoutFactor.create(checkoutFactorsWithMerchant);
    console.log("Created checkout factors");

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
