module.exports = {
  Error: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: false,
      },
      message: {
        type: "string",
        example: "Error message",
      },
      errors: {
        type: "array",
        items: {
          type: "string",
        },
        example: ["Validation error 1", "Validation error 2"],
      },
    },
  },
  LoginRequest: {
    type: "object",
    required: ["email", "password", "merchant"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "yourpassword123",
      },
      merchant: {
        type: "string",
        format: "objectId",
        description: "Merchant ID",
        example: "507f1f77bcf86cd799439011",
      },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "objectId",
            example: "507f1f77bcf86cd799439011",
          },
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          role: {
            type: "string",
            enum: ["user", "admin"],
            example: "user",
          },
          merchant: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "objectId",
                example: "507f1f77bcf86cd799439011",
              },
              name: {
                type: "string",
                example: "Demo Store",
              },
              domain: {
                type: "string",
                example: "demo-store.myshopify.com",
              },
            },
          },
        },
      },
    },
  },
  PollRequest: {
    type: "object",
    required: [
      "visitorId",
      "sessionId",
      "product",
      "behavioralSignals",
      "deviceInfo",
    ],
    properties: {
      visitorId: {
        type: "string",
        example: "v_abc123",
      },
      sessionId: {
        type: "string",
        example: "s_xyz789",
      },
      product: {
        type: "object",
        required: ["id", "name", "url", "price", "currency"],
        properties: {
          id: {
            type: "string",
            example: "prod_123",
          },
          name: {
            type: "string",
            example: "Example Product",
          },
          url: {
            type: "string",
            example: "/products/example-product",
          },
          price: {
            type: "number",
            example: 99.99,
          },
          currency: {
            type: "string",
            example: "USD",
          },
        },
      },
      behavioralSignals: {
        type: "object",
        properties: {
          timeOnPage: {
            type: "number",
            description: "Time spent on page in seconds",
            example: 120,
          },
          scrollDepth: {
            type: "number",
            description: "Percentage of page scrolled",
            example: 75,
          },
          imageViews: {
            type: "number",
            description: "Number of product images viewed",
            example: 3,
          },
          addToCartHover: {
            type: "boolean",
            description: "Whether user hovered over add to cart button",
            example: true,
          },
          priceViewDuration: {
            type: "number",
            description: "Time spent viewing price in seconds",
            example: 15,
          },
          productInteraction: {
            type: "boolean",
            description: "Whether user interacted with product details",
            example: true,
          },
        },
      },
      deviceInfo: {
        type: "object",
        properties: {
          type: {
            type: "string",
            enum: ["desktop", "mobile", "tablet"],
            example: "desktop",
          },
          userAgent: {
            type: "string",
            example: "Mozilla/5.0...",
          },
          screenSize: {
            type: "string",
            example: "1920x1080",
          },
        },
      },
    },
  },
  PollResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      data: {
        type: "object",
        properties: {
          intentType: {
            type: "string",
            enum: ["high-intent", "price-sensitive", "just-browsing"],
            example: "high-intent",
          },
          intentScore: {
            type: "number",
            minimum: 0,
            maximum: 100,
            example: 85,
          },
          widget: {
            $ref: "#/components/schemas/Widget",
          },
        },
      },
    },
  },
  AnalyticsOverview: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      data: {
        type: "object",
        properties: {
          merchant: {
            $ref: "#/components/schemas/Merchant",
          },
          totalDetections: {
            type: "number",
            example: 1000,
          },
          conversionRate: {
            type: "number",
            example: 15.5,
          },
          intentDistribution: {
            type: "object",
            properties: {
              highIntent: {
                type: "number",
                example: 30,
              },
              priceSensitive: {
                type: "number",
                example: 45,
              },
              justBrowsing: {
                type: "number",
                example: 25,
              },
            },
          },
          widgetPerformance: {
            type: "object",
            properties: {
              impressions: {
                type: "number",
                example: 800,
              },
              interactions: {
                type: "number",
                example: 200,
              },
              conversions: {
                type: "number",
                example: 50,
              },
            },
          },
        },
      },
    },
  },
  IntentRule: {
    type: "object",
    required: ["intentType", "threshold", "behavioralSignals", "merchant"],
    properties: {
      merchant: {
        type: "string",
        format: "objectId",
        description: "Merchant ID",
        example: "507f1f77bcf86cd799439011",
      },
      intentType: {
        type: "string",
        enum: ["high-intent", "price-sensitive", "just-browsing"],
        example: "high-intent",
      },
      threshold: {
        type: "number",
        minimum: 0,
        maximum: 100,
        example: 70,
      },
      behavioralSignals: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "timeOnPage",
            },
            description: {
              type: "string",
              example: "Time spent on page",
            },
            enabled: {
              type: "boolean",
              example: true,
            },
            weight: {
              type: "number",
              minimum: 0,
              maximum: 10,
              example: 3,
            },
            threshold: {
              type: "number",
              example: 120,
            },
          },
        },
      },
      isActive: {
        type: "boolean",
        example: true,
      },
    },
  },
  Widget: {
    type: "object",
    required: ["intentType", "widgetType", "content", "styling", "merchant"],
    properties: {
      merchant: {
        type: "string",
        format: "objectId",
        description: "Merchant ID",
        example: "507f1f77bcf86cd799439011",
      },
      intentType: {
        type: "string",
        enum: ["high-intent", "price-sensitive", "just-browsing"],
        example: "high-intent",
      },
      widgetType: {
        type: "string",
        enum: ["urgency", "discount", "social-proof", "recommendation"],
        example: "urgency",
      },
      content: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Limited Time Offer!",
          },
          message: {
            type: "string",
            example: "Only 5 left in stock!",
          },
          additionalText: {
            type: "string",
            example: "Order now before stock runs out",
          },
        },
      },
      styling: {
        type: "object",
        properties: {
          position: {
            type: "string",
            enum: [
              "above-price",
              "below-price",
              "above-button",
              "below-button",
            ],
            example: "below-price",
          },
          colors: {
            type: "object",
            properties: {
              background: {
                type: "string",
                example: "#fff5f7",
              },
              text: {
                type: "string",
                example: "#e53e3e",
              },
              accent: {
                type: "string",
                example: "#e53e3e",
              },
            },
          },
          showIcons: {
            type: "boolean",
            example: true,
          },
        },
      },
      settings: {
        type: "object",
        properties: {
          showCountdown: {
            type: "boolean",
            example: true,
          },
          countdownDuration: {
            type: "number",
            description: "Duration in seconds",
            example: 900,
          },
          showStockLevel: {
            type: "boolean",
            example: true,
          },
          showRecentActivity: {
            type: "boolean",
            example: false,
          },
        },
      },
    },
  },
  Merchant: {
    type: "object",
    required: ["name", "domain", "platform"],
    properties: {
      id: {
        type: "string",
        format: "objectId",
        example: "507f1f77bcf86cd799439011",
      },
      name: {
        type: "string",
        example: "Demo Store",
      },
      domain: {
        type: "string",
        example: "demo-store.myshopify.com",
      },
      platform: {
        type: "string",
        enum: ["shopify", "woocommerce", "magento", "custom"],
        example: "shopify",
      },
      settings: {
        type: "object",
        properties: {
          widgetPlacement: {
            type: "string",
            enum: ["below-price", "above-button"],
            example: "below-price",
          },
          intentThresholds: {
            type: "object",
            properties: {
              highIntent: {
                type: "number",
                example: 70,
              },
              priceSensitive: {
                type: "number",
                example: 50,
              },
            },
          },
        },
      },
    },
  },
  CheckoutFactor: {
    type: "object",
    required: ["merchant", "factorType", "name", "description", "impact"],
    properties: {
      merchant: {
        type: "string",
        format: "objectId",
        description: "Merchant ID",
        example: "507f1f77bcf86cd799439011",
      },
      factorType: {
        type: "string",
        enum: [
          "payment-friction",
          "shipping-concerns",
          "trust-concerns",
          "price-sensitivity",
          "urgency",
          "social-proof",
        ],
        example: "urgency",
      },
      name: {
        type: "string",
        example: "Limited Time Offer",
      },
      description: {
        type: "string",
        example: "Creates urgency by showing limited time availability",
      },
      impact: {
        type: "number",
        minimum: 0,
        maximum: 100,
        example: 75,
      },
      enabled: {
        type: "boolean",
        default: true,
        example: true,
      },
      intentStrategies: {
        type: "array",
        items: {
          type: "object",
          properties: {
            intentType: {
              type: "string",
              enum: [
                "high-intent",
                "price-sensitive",
                "cart-abandoner",
                "first-time-visitor",
              ],
              example: "high-intent",
            },
            enabled: {
              type: "boolean",
              example: true,
            },
            strategy: {
              type: "string",
              example: "show-discount",
            },
          },
        },
      },
      strategies: {
        type: "object",
        additionalProperties: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Discount Strategy",
            },
            description: {
              type: "string",
              example: "Offers percentage-based discount",
            },
            enabled: {
              type: "boolean",
              example: true,
            },
            value: {
              type: "string",
              example: "10% OFF",
            },
          },
        },
      },
      performance: {
        type: "object",
        properties: {
          impressions: {
            type: "number",
            example: 1000,
          },
          interactions: {
            type: "number",
            example: 250,
          },
          conversions: {
            type: "number",
            example: 50,
          },
          lastUpdated: {
            type: "string",
            format: "date-time",
            example: "2024-04-25T14:55:33.123Z",
          },
        },
      },
      displayRules: {
        type: "object",
        properties: {
          minOrderValue: {
            type: "number",
            example: 50,
          },
          maxOrderValue: {
            type: "number",
            example: 500,
          },
          customerTypes: {
            type: "array",
            items: {
              type: "string",
              enum: ["new", "returning", "vip"],
            },
            example: ["new", "returning"],
          },
          geoLocations: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["US", "CA", "UK"],
          },
          deviceTypes: {
            type: "array",
            items: {
              type: "string",
              enum: ["mobile", "tablet", "desktop"],
            },
            example: ["mobile", "desktop"],
          },
          timeRestrictions: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
                example: "09:00",
              },
              endTime: {
                type: "string",
                example: "17:00",
              },
              daysOfWeek: {
                type: "array",
                items: {
                  type: "string",
                  enum: [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ],
                },
                example: [
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                ],
              },
            },
          },
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2024-04-25T14:55:33.123Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2024-04-25T14:55:33.123Z",
      },
    },
  },
};
