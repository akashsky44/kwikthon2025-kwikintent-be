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

    // Drop database to ensure clean state
    await mongoose.connection.dropDatabase();
    console.log("Cleared existing data");

    // Step 1: Create demo merchant (without owner)
    const demoMerchant = await Merchant.create(merchants[0]);
    console.log("Created demo merchant");

    // Step 2: Create users with merchant reference
    const adminUser = await User.create({
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      merchant: demoMerchant._id,
    });

    const additionalUsers = users.map((user) => ({
      ...user,
      merchant: demoMerchant._id,
    }));
    await User.create(additionalUsers);
    console.log("Created users");

    // Step 3: Create intent rules
    const rulesWithMerchant = intentRules.map((rule) => ({
      ...rule,
      merchant: demoMerchant._id,
    }));
    await IntentRule.create(rulesWithMerchant);
    console.log("Created intent rules");

    // Step 4: Create widgets
    const widgetsWithMerchant = widgets.map((widget) => ({
      ...widget,
      merchant: demoMerchant._id,
    }));
    await Widget.create(widgetsWithMerchant);
    console.log("Created widgets");

    // Step 5: Create detections
    const detectionsWithMerchant = detections.map((detection) => ({
      ...detection,
      merchant: demoMerchant._id,
    }));
    await Detection.create(detectionsWithMerchant);
    console.log("Created detections");

    // Step 6: Create configuration
    const configWithMerchant = {
      ...configurations[0],
      merchant: demoMerchant._id,
    };
    await Configuration.create(configWithMerchant);
    console.log("Created configuration");

    // Step 7: Create checkout factors
    const factorsWithMerchant = checkoutFactors.map((factor) => ({
      ...factor,
      merchant: demoMerchant._id,
    }));
    await CheckoutFactor.create(factorsWithMerchant);
    console.log("Created checkout factors");

    console.log("\nDatabase seeded successfully!");
    console.log("\nTest Credentials:");
    console.log("Admin Email:", adminUser.email);
    console.log("Admin Password: admin123");
    console.log("\nMerchant Details:");
    console.log("Domain:", demoMerchant.domain);
    console.log("API Key:", demoMerchant.apiKey);

    process.exit(0);
  } catch (error) {
    console.error("\nError seeding database:", error);
    process.exit(1);
  }
}

// Run seeding
seedDatabase();
