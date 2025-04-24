const detections = [
  {
    visitorId: "v_123456",
    sessionId: "s_abcdef",
    intentType: "high-intent",
    intentScore: 85,
    product: {
      id: "prod_123",
      productId: "shopify_123456",
      name: "Premium Wireless Headphones",
      url: "/products/premium-wireless-headphones",
      price: 199.99,
      currency: "USD",
    },
    actionTaken: "showed-widget",
    behavioralSignals: {
      timeOnPage: 180,
      scrollDepth: 90,
      imageViews: 4,
      addToCartHover: true,
      priceCheckCount: 1,
    },
    deviceInfo: {
      type: "desktop",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      screenSize: "1920x1080",
    },
    location: {
      country: "US",
      region: "CA",
      city: "San Francisco",
    },
    result: {
      widgetClicked: true,
      converted: true,
      orderValue: 199.99,
      isPrepaid: true,
    },
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000),
  },
  {
    visitorId: "v_789012",
    sessionId: "s_ghijkl",
    intentType: "price-sensitive",
    intentScore: 75,
    product: {
      id: "prod_456",
      productId: "shopify_789012",
      name: "Smart Fitness Watch",
      url: "/products/smart-fitness-watch",
      price: 149.99,
      currency: "USD",
    },
    actionTaken: "showed-widget",
    behavioralSignals: {
      timeOnPage: 120,
      scrollDepth: 60,
      imageViews: 2,
      priceCheckCount: 3,
      couponSearch: true,
    },
    deviceInfo: {
      type: "mobile",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)",
      screenSize: "390x844",
    },
    location: {
      country: "US",
      region: "NY",
      city: "New York",
    },
    result: {
      widgetClicked: true,
      converted: true,
      orderValue: 134.99,
      isPrepaid: true,
    },
    createdAt: new Date(Date.now() - 43200000), // 12 hours ago
    updatedAt: new Date(Date.now() - 43200000),
  },
  {
    visitorId: "v_345678",
    sessionId: "s_mnopqr",
    intentType: "just-browsing",
    intentScore: 40,
    product: {
      id: "prod_789",
      productId: "shopify_345678",
      name: "Organic Cotton T-Shirt",
      url: "/products/organic-cotton-tshirt",
      price: 79.99,
      currency: "USD",
    },
    actionTaken: "showed-widget",
    behavioralSignals: {
      timeOnPage: 45,
      scrollDepth: 30,
      imageViews: 1,
      quickPageViews: true,
    },
    deviceInfo: {
      type: "tablet",
      userAgent: "Mozilla/5.0 (iPad; CPU OS 14_0)",
      screenSize: "820x1180",
    },
    location: {
      country: "US",
      region: "TX",
      city: "Austin",
    },
    result: {
      widgetClicked: false,
      converted: false,
    },
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000),
  },
];

module.exports = detections;
