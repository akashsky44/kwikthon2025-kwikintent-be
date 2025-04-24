const merchants = [
  {
    name: "Demo Store",
    domain: "demostore.myshopify.com",
    platform: "shopify",
    apiKey: "demo_api_key",
    apiSecret: "demo_api_secret",
    password: "demo123",
    settings: {
      widgetPlacement: "below-price",
      intentThresholds: {
        highIntent: 70,
        priceSensitive: 50,
        justBrowsing: 30,
      },
      widgetStyles: {
        colors: {
          primary: "#e53e3e",
          secondary: "#fff5f7",
          text: "#1a202c",
        },
        fonts: {
          family: "system-ui",
          size: "14px",
        },
      },
      features: {
        stockCounter: true,
        countdown: true,
        socialProof: true,
        recentActivity: true,
      },
    },
  },
];

module.exports = merchants;
