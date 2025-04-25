const mongoose = require("mongoose");
const IntentRule = require("../models/intentRule.model");

const seedIntentRules = async (merchantId) => {
  // Clear existing rules
  await IntentRule.deleteMany({ merchant: merchantId });

  // High Intent Rule
  const highIntentRule = new IntentRule({
    merchant: merchantId,
    intentType: "high-intent",
    threshold: 70,
    behavioralSignals: [
      {
        name: "timeOnPage",
        description: "Time spent on page in seconds",
        enabled: true,
        weight: 8,
        threshold: 180, // 3 minutes
      },
      {
        name: "scrollDepth",
        description: "Page scroll percentage",
        enabled: true,
        weight: 6,
        threshold: 70,
      },
      {
        name: "addToCartHover",
        description: "Hovered over add to cart button",
        enabled: true,
        weight: 10,
      },
      {
        name: "productInteraction",
        description: "Interacted with product",
        enabled: true,
        weight: 7,
      },
    ],
    isActive: true,
  });

  // Price Sensitive Rule
  const priceSensitiveRule = new IntentRule({
    merchant: merchantId,
    intentType: "price-sensitive",
    threshold: 60,
    behavioralSignals: [
      {
        name: "priceViewDuration",
        description: "Time spent viewing price",
        enabled: true,
        weight: 10,
        threshold: 8, // 8 seconds
      },
      {
        name: "comparisonViews",
        description: "Viewed comparison products",
        enabled: true,
        weight: 8,
      },
      {
        name: "previousAbandonment",
        description: "Previously abandoned cart",
        enabled: true,
        weight: 7,
      },
      {
        name: "exitOnCheckout",
        description: "Exited on checkout page",
        enabled: true,
        weight: 6,
      },
    ],
    isActive: true,
  });

  // Just Browsing Rule
  const justBrowsingRule = new IntentRule({
    merchant: merchantId,
    intentType: "just-browsing",
    threshold: 40,
    behavioralSignals: [
      {
        name: "timeOnPage",
        description: "Time spent on page in seconds",
        enabled: true,
        weight: 6,
        threshold: 30, // 30 seconds
      },
      {
        name: "scrollDepth",
        description: "Page scroll percentage",
        enabled: true,
        weight: 5,
        threshold: 30,
      },
      {
        name: "imageViews",
        description: "Number of product images viewed",
        enabled: true,
        weight: 4,
        threshold: 1,
      },
    ],
    isActive: true,
  });

  await Promise.all([
    highIntentRule.save(),
    priceSensitiveRule.save(),
    justBrowsingRule.save(),
  ]);

  console.log("Intent rules seeded successfully");
};

// Example usage:
// seedIntentRules('680ba07eb0f3532d513399b6')
//   .then(() => console.log('Seeding complete'))
//   .catch(console.error);

module.exports = seedIntentRules;
