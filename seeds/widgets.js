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
      variables: {
        stock: 5,
        countdown: "15:00",
      },
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
      animation: "fade-in",
    },
    settings: {
      showCountdown: true,
      countdownDuration: 900, // 15 minutes
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
    createdAt: new Date(),
    updatedAt: new Date(),
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
      variables: {
        code: "SAVE10",
        discount: 10,
      },
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
      animation: "slide-up",
    },
    settings: {
      discountCode: "SAVE10",
      discountValue: 10,
      displayRules: {
        minCartValue: 100,
        oneTimeUse: true,
        excludedProducts: [],
      },
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastUpdated: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    intentType: "just-browsing",
    widgetType: "social-proof",
    name: "Just Browsing Social Proof Widget",
    isActive: true,
    content: {
      title: "Popular Choice!",
      message: "{count}+ people purchased this item in the last 24 hours!",
      additionalText: "Join others who love this product",
      variables: {
        count: 120,
      },
    },
    styling: {
      position: "below-price",
      colors: {
        background: "#ebf8ff",
        text: "#3182ce",
        accent: "#3182ce",
      },
      fontFamily: "system-ui",
      borderRadius: "8px",
      padding: "16px",
      animation: "fade-in",
    },
    settings: {
      displayRules: {
        showStarRating: true,
        showReviewCount: true,
        minPurchaseCount: 50,
      },
    },
    performance: {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      lastUpdated: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = widgets;
