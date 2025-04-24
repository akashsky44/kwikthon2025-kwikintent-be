const intentRules = [
  {
    intentType: "high-intent",
    threshold: 70,
    description:
      "The confidence threshold required to classify a user as high intent",
    isActive: true,
    behavioralSignals: [
      {
        name: "timeOnPage",
        description: "User spends significant time on product page",
        enabled: true,
        weight: 3,
        threshold: 120, // seconds
      },
      {
        name: "scrollDepth",
        description: "User scrolls to product details and reviews",
        enabled: true,
        weight: 2,
        threshold: 80, // percentage
      },
      {
        name: "imageViews",
        description: "User views multiple product images",
        enabled: true,
        weight: 2,
        threshold: 3, // count
      },
      {
        name: "addToCartHover",
        description: "User hovers over add to cart button",
        enabled: true,
        weight: 3,
        threshold: 1, // boolean
      },
      {
        name: "returnVisitor",
        description: "User has visited this product before",
        enabled: true,
        weight: 2,
        threshold: 1, // boolean
      },
    ],
    historicalFactors: [
      {
        name: "previousPurchaseHistory",
        description: "User has purchased similar items before",
        enabled: true,
        weight: 3,
      },
      {
        name: "cartAbandonmentHistory",
        description: "User has abandoned cart in the past",
        enabled: true,
        weight: 2,
      },
      {
        name: "averageOrderValue",
        description: "User's historical average order value",
        enabled: true,
        weight: 1,
      },
    ],
    customRules: [],
  },
  {
    intentType: "price-sensitive",
    threshold: 50,
    description:
      "The confidence threshold required to classify a user as price sensitive",
    isActive: true,
    behavioralSignals: [
      {
        name: "priceCheckFrequency",
        description:
          "User checks price multiple times or compares with other products",
        enabled: true,
        weight: 3,
        threshold: 2, // count
      },
      {
        name: "couponSearch",
        description: "User searches for coupons or discount codes",
        enabled: true,
        weight: 3,
        threshold: 1, // boolean
      },
      {
        name: "priceSortUsage",
        description: "User sorts products by price (low to high)",
        enabled: true,
        weight: 2,
        threshold: 1, // boolean
      },
      {
        name: "cartHesitation",
        description: "User adds to cart but hesitates to checkout",
        enabled: true,
        weight: 2,
        threshold: 1, // boolean
      },
    ],
    historicalFactors: [
      {
        name: "discountUsageHistory",
        description: "User has used discounts or coupons in the past",
        enabled: true,
        weight: 3,
      },
      {
        name: "salePurchaseHistory",
        description: "User primarily purchases during sales",
        enabled: true,
        weight: 2,
      },
    ],
    customRules: [],
  },
  {
    intentType: "just-browsing",
    threshold: 30,
    description:
      "Users who don't meet the criteria for High Intent or Price Sensitive are classified as Just Browsing",
    isActive: true,
    behavioralSignals: [
      {
        name: "quickPageViews",
        description: "User views multiple products quickly",
        enabled: true,
        weight: 2,
        threshold: 30, // seconds per page
      },
      {
        name: "limitedEngagement",
        description: "User doesn't engage deeply with product details",
        enabled: true,
        weight: 3,
        threshold: 20, // percentage scroll depth
      },
      {
        name: "firstTimeVisitor",
        description: "User is visiting the site for the first time",
        enabled: true,
        weight: 2,
        threshold: 1, // boolean
      },
    ],
    historicalFactors: [],
    customRules: [],
  },
];

module.exports = intentRules;
