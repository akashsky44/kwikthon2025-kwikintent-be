const checkoutFactorPaths = require("./checkout-factor-paths");
const configurationPaths = require("./configuration-paths");
const merchantPaths = require("./merchant-paths");
const pdpPaths = require("./pdp-paths");
const dashboardPaths = require("./dashboard-paths");
const publicPaths = require("./public-paths");
const intentRulesPaths = require("./intent-rules-paths");
const widgetPaths = require("./widget-paths");

module.exports = {
  "/health": {
    get: {
      tags: ["System"],
      summary: "Health check endpoint",
      responses: {
        200: {
          description: "API health status",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "API is healthy",
                  },
                  timestamp: {
                    type: "string",
                    format: "date-time",
                    example: "2024-04-25T14:55:33.123Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password", "merchant"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
                password: {
                  type: "string",
                  format: "password",
                },
                merchant: {
                  type: "string",
                  format: "objectId",
                  description: "Merchant ID",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginResponse",
              },
            },
          },
        },
      },
    },
  },
  "/auth/me": {
    get: {
      tags: ["Authentication"],
      summary: "Get current user profile",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Current user profile",
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
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Authentication"],
      summary: "Update current user profile",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  format: "email",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
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
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  ...checkoutFactorPaths,
  ...configurationPaths,
  ...merchantPaths,
  ...pdpPaths,
  ...dashboardPaths,
  ...publicPaths,
  ...intentRulesPaths,
  ...widgetPaths,
  "/analytics/overview": {
    get: {
      tags: ["Analytics"],
      summary: "Get analytics overview for merchant",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Analytics overview",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AnalyticsOverview",
              },
            },
          },
        },
      },
    },
  },
  "/analytics/intent-distribution": {
    get: {
      tags: ["Analytics"],
      summary: "Get intent distribution analytics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Intent distribution data",
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
                },
              },
            },
          },
        },
      },
    },
  },
};
