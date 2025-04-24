# Backend Restructuring Plan

[Previous sections remain unchanged...]

## 7. Seeding Data Structure

### Users Seed (seeds/users.js)

```javascript
const users = [
  {
    email: "demo@example.com",
    password: "hashedPassword123",
    company: "Demo Store",
    plan: "pro",
    settings: {
      defaultCurrency: "USD",
      timezone: "America/New_York",
      notificationPreferences: {
        email: true,
        dashboard: true,
      },
    },
  },
];
```

### Intent Rules Seed (seeds/intentRules.js)

```javascript
const intentRules = [
  {
    intentType: "high-intent",
    threshold: 70,
    isActive: true,
    behavioralSignals: [
      {
        name: "Time on Product Page",
        description: "User spends significant time on product page",
        enabled: true,
        weight: 3,
        threshold: 120, // seconds
      },
      {
        name: "Deep Scroll Depth",
        description: "User scrolls to product details and reviews",
        enabled: true,
        weight: 2,
        threshold: 80, // percentage
      },
      {
        name: "Multiple Image Views",
        description: "User views multiple product images",
        enabled: true,
        weight: 2,
        threshold: 3, // count
      },
    ],
    historicalFactors: [
      {
        name: "Previous Purchase History",
        description: "User has purchased similar items before",
        enabled: true,
        weight: 3,
      },
    ],
  },
  {
    intentType: "price-sensitive",
    threshold: 60,
    isActive: true,
    behavioralSignals: [
      {
        name: "Price Check Frequency",
        description: "User checks price multiple times",
        enabled: true,
        weight: 3,
        threshold: 2, // count
      },
      {
        name: "Coupon Search",
        description: "User searches for coupons",
        enabled: true,
        weight: 3,
        threshold: 1, // boolean
      },
    ],
    historicalFactors: [
      {
        name: "Discount Usage History",
        description: "User has used discounts before",
        enabled: true,
        weight: 2,
      },
    ],
  },
];
```

### Widgets Seed (seeds/widgets.js)

```javascript
const widgets = [
  {
    intentType: "high-intent",
    widgetType: "urgency",
    name: "High Intent Urgency Widget",
    isActive: true,
    content: {
      title: "Limited Time Offer!",
      message: "Only {stock} left in stock at this price!",
      additionalText: "Offer expires in {countdown}",
    },
    styling: {
      position: "below-price",
      colors: {
        background: "#fff5f7",
        text: "#e53e3e",
        accent: "#e53e3e",
      },
      fontFamily: "system-ui",
      borderRadius: "8px",
      padding: "16px",
    },
    settings: {
      showCountdown: true,
      countdownDuration: 900,
      stockThreshold: 5,
      displayRules: {
        minPrice: 50,
        maxPrice: 1000,
        excludedCategories: [],
      },
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastUpdated: new Date(),
    },
  },
  {
    intentType: "price-sensitive",
    widgetType: "discount",
    name: "Price Sensitive Discount Widget",
    isActive: true,
    content: {
      title: "Special Offer",
      message: "Use code {code} for {discount}% off",
      additionalText: "Limited time offer",
    },
    styling: {
      position: "above-add-to-cart",
      colors: {
        background: "#fffaf0",
        text: "#dd6b20",
        accent: "#dd6b20",
      },
      fontFamily: "system-ui",
      borderRadius: "8px",
      padding: "16px",
    },
    settings: {
      discountCode: "SAVE10",
      discountValue: 10,
      displayRules: {
        minCartValue: 100,
        oneTimeUse: true,
      },
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastUpdated: new Date(),
    },
  },
];
```

### Detections Seed (seeds/detections.js)

```javascript
const detections = [
  {
    visitorId: "v_123456",
    sessionId: "s_abcdef",
    intentType: "high-intent",
    confidenceScore: 85,
    product: {
      id: "prod_123",
      url: "/products/example-product",
      price: 199.99,
      currency: "USD",
    },
    actionTaken: "showed-widget",
    behavioralSignals: {
      timeOnPage: 180,
      scrollDepth: 90,
      imageViews: 4,
      addToCartHover: true,
    },
    deviceInfo: {
      type: "desktop",
      userAgent: "Mozilla/5.0...",
      screenSize: "1920x1080",
    },
    location: {
      country: "US",
      region: "CA",
    },
    result: {
      widgetClicked: true,
      converted: true,
      orderValue: 199.99,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
```

### Seed Script (seeds/index.js)

```javascript
const mongoose = require("mongoose");
const User = require("../src/models/user.model");
const IntentRule = require("../src/models/intentRule.model");
const Widget = require("../src/models/widget.model");
const Detection = require("../src/models/detection.model");

const users = require("./users");
const intentRules = require("./intentRules");
const widgets = require("./widgets");
const detections = require("./detections");

async function seedDatabase() {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      IntentRule.deleteMany({}),
      Widget.deleteMany({}),
      Detection.deleteMany({}),
    ]);

    // Create demo user
    const demoUser = await User.create(users[0]);

    // Create intent rules and widgets for demo user
    const intentRulesWithUser = intentRules.map((rule) => ({
      ...rule,
      userId: demoUser._id,
    }));
    await IntentRule.create(intentRulesWithUser);

    const widgetsWithUser = widgets.map((widget) => ({
      ...widget,
      userId: demoUser._id,
    }));
    await Widget.create(widgetsWithUser);

    // Create sample detections
    const detectionsWithUser = detections.map((detection) => ({
      ...detection,
      userId: demoUser._id,
    }));
    await Detection.create(detectionsWithUser);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

module.exports = seedDatabase;
```

[Previous sections remain unchanged...]

Would you like me to switch to Code mode now to begin implementation?
