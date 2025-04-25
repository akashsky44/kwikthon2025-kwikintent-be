// Public Routes
module.exports = {
  "/public/pdp/poll/{merchantId}": {
    post: {
      tags: ["Public"],
      summary: "Poll user behavior and get widget",
      parameters: [
        {
          in: "path",
          name: "merchantId",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "ID of the merchant",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["visitorId", "sessionId", "behavioralSignals"],
              properties: {
                visitorId: {
                  type: "string",
                  example: "v_abc123",
                },
                sessionId: {
                  type: "string",
                  example: "s_xyz789",
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
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Intent analysis and widget response",
          content: {
            "application/json": {
              schema: {
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
                        enum: [
                          "high-intent",
                          "price-sensitive",
                          "just-browsing",
                        ],
                      },
                      widget: {
                        $ref: "#/components/schemas/Widget",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/public/pdp/widget-script/{merchantId}": {
    get: {
      tags: ["Public"],
      summary: "Get widget script for merchant",
      parameters: [
        {
          in: "path",
          name: "merchantId",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "ID of the merchant",
        },
      ],
      responses: {
        200: {
          description: "Widget script",
          content: {
            "application/javascript": {
              schema: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
  "/public/analytics/interaction/{widgetId}": {
    post: {
      tags: ["Public Analytics"],
      summary: "Track widget interaction",
      parameters: [
        {
          in: "path",
          name: "widgetId",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "ID of the widget",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["visitorId", "sessionId", "interactionType"],
              properties: {
                visitorId: {
                  type: "string",
                  example: "v_abc123",
                },
                sessionId: {
                  type: "string",
                  example: "s_xyz789",
                },
                interactionType: {
                  type: "string",
                  enum: ["view", "click", "hover"],
                  example: "click",
                },
                metadata: {
                  type: "object",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Interaction tracked",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/public/analytics/conversion/{sessionId}": {
    post: {
      tags: ["Public Analytics"],
      summary: "Track conversion",
      parameters: [
        {
          in: "path",
          name: "sessionId",
          required: true,
          schema: {
            type: "string",
          },
          description: "Session ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["visitorId", "conversionType", "value"],
              properties: {
                visitorId: {
                  type: "string",
                  example: "v_abc123",
                },
                conversionType: {
                  type: "string",
                  enum: ["purchase", "add_to_cart", "signup"],
                  example: "purchase",
                },
                value: {
                  type: "number",
                  example: 99.99,
                },
                metadata: {
                  type: "object",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Conversion tracked",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/public/analytics/event/{merchantId}": {
    post: {
      tags: ["Public Analytics"],
      summary: "Track custom event",
      parameters: [
        {
          in: "path",
          name: "merchantId",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "ID of the merchant",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["visitorId", "sessionId", "eventType"],
              properties: {
                visitorId: {
                  type: "string",
                  example: "v_abc123",
                },
                sessionId: {
                  type: "string",
                  example: "s_xyz789",
                },
                eventType: {
                  type: "string",
                  example: "product_view",
                },
                metadata: {
                  type: "object",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Event tracked",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
