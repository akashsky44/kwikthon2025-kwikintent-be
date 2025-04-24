const defaultConfigurations = [
  {
    intentTypes: {
      highIntent: {
        threshold: 70,
        behavioralSignals: [
          {
            name: "timeOnPage",
            description: "User spends significant time on product page",
            enabled: true,
            weight: 3,
            threshold: 120,
          },
          {
            name: "scrollDepth",
            description: "User scrolls to product details and reviews",
            enabled: true,
            weight: 2,
            threshold: 80,
          },
          {
            name: "imageViews",
            description: "User views multiple product images",
            enabled: true,
            weight: 2,
            threshold: 3,
          },
          {
            name: "addToCartHover",
            description: "User hovers over add to cart button",
            enabled: true,
            weight: 3,
            threshold: 1,
          },
          {
            name: "returnVisitor",
            description: "User has visited this product before",
            enabled: true,
            weight: 2,
            threshold: 1,
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
        ],
        deviceContext: [
          {
            name: "deviceType",
            description: "Consider user's device type",
            enabled: true,
            weight: 1,
          },
          {
            name: "timeOfDay",
            description: "Consider time of day",
            enabled: true,
            weight: 1,
          },
        ],
      },
      priceSensitive: {
        threshold: 50,
        behavioralSignals: [
          {
            name: "priceCheckFrequency",
            description: "User checks price multiple times",
            enabled: true,
            weight: 3,
            threshold: 2,
          },
          {
            name: "couponSearch",
            description: "User searches for coupons",
            enabled: true,
            weight: 3,
            threshold: 1,
          },
          {
            name: "priceSortUsage",
            description: "User sorts products by price",
            enabled: true,
            weight: 2,
            threshold: 1,
          },
          {
            name: "cartHesitation",
            description: "User hesitates at checkout",
            enabled: true,
            weight: 2,
            threshold: 1,
          },
        ],
        historicalFactors: [
          {
            name: "discountUsageHistory",
            description: "User has used discounts before",
            enabled: true,
            weight: 3,
          },
          {
            name: "salePurchaseHistory",
            description: "User buys during sales",
            enabled: true,
            weight: 2,
          },
        ],
      },
      justBrowsing: {
        threshold: 30,
        behavioralSignals: [
          {
            name: "quickPageViews",
            description: "User views multiple products quickly",
            enabled: true,
            weight: 2,
            threshold: 30,
          },
          {
            name: "limitedEngagement",
            description: "User doesn't engage deeply",
            enabled: true,
            weight: 3,
            threshold: 20,
          },
          {
            name: "firstTimeVisitor",
            description: "First time visitor",
            enabled: true,
            weight: 2,
            threshold: 1,
          },
        ],
      },
    },
    checkoutFactors: {
      paymentMethods: [
        {
          name: "creditCard",
          enabled: true,
          weight: 3,
        },
        {
          name: "debitCard",
          enabled: true,
          weight: 3,
        },
        {
          name: "upi",
          enabled: true,
          weight: 2,
        },
        {
          name: "cod",
          enabled: true,
          weight: 1,
        },
      ],
      shippingOptions: [
        {
          name: "express",
          enabled: true,
          weight: 3,
        },
        {
          name: "standard",
          enabled: true,
          weight: 2,
        },
        {
          name: "economy",
          enabled: true,
          weight: 1,
        },
      ],
      discountRules: [
        {
          name: "firstPurchase",
          condition: "isFirstPurchase == true",
          enabled: true,
          value: 10,
        },
        {
          name: "abandonedCart",
          condition: "hasAbandonedCart == true",
          enabled: true,
          value: 5,
        },
        {
          name: "highValue",
          condition: "cartValue > 1000",
          enabled: true,
          value: 15,
        },
      ],
    },
    widgetSettings: {
      highIntent: {
        type: "urgency",
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
        },
        settings: {
          showCountdown: true,
          countdownDuration: 900,
        },
      },
      priceSensitive: {
        type: "discount",
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
        },
        settings: {
          discountCode: "SAVE10",
          discountValue: 10,
        },
      },
      justBrowsing: {
        type: "social-proof",
        content: {
          title: "Popular Choice!",
          message: "{count}+ people purchased this item recently!",
          additionalText: "Join others who love this product",
        },
        styling: {
          position: "below-price",
          colors: {
            background: "#ebf8ff",
            text: "#3182ce",
            accent: "#3182ce",
          },
        },
        settings: {
          showReviews: true,
          showRating: true,
        },
      },
    },
    advancedSettings: {
      pollingInterval: 5000,
      sessionTimeout: 1800000,
      detectionThresholds: {
        timeOnPage: 30,
        scrollDepth: 50,
        interactionCount: 3,
      },
    },
  },
];

module.exports = defaultConfigurations;
