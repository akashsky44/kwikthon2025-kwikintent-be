module.exports = {
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
  "/intent-rules": {
    get: {
      tags: ["Intent Rules"],
      summary: "Get all intent rules for merchant",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of intent rules",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/IntentRule",
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Intent Rules"],
      summary: "Create intent rule",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/IntentRule",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Intent rule created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/IntentRule",
              },
            },
          },
        },
      },
    },
  },
  "/widgets": {
    get: {
      tags: ["Widgets"],
      summary: "Get all widgets for merchant",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of widgets",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Widget",
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Widgets"],
      summary: "Create widget",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Widget",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Widget created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Widget",
              },
            },
          },
        },
      },
    },
  },
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
  "/public/pdp/poll/{merchantId}": {
    post: {
      tags: ["Public"],
      summary: "Poll for user intent and get widget",
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
              $ref: "#/components/schemas/PollRequest",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Intent analysis successful",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PollResponse",
              },
            },
          },
        },
        404: {
          description: "Merchant not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  "/merchants/{merchantId}/settings": {
    put: {
      tags: ["Merchants"],
      summary: "Update merchant settings",
      security: [{ bearerAuth: [] }],
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
              properties: {
                settings: {
                  type: "object",
                  properties: {
                    widgetPlacement: {
                      type: "string",
                      enum: ["below-price", "above-button"],
                    },
                    intentThresholds: {
                      type: "object",
                      properties: {
                        highIntent: {
                          type: "number",
                          minimum: 0,
                          maximum: 100,
                        },
                        priceSensitive: {
                          type: "number",
                          minimum: 0,
                          maximum: 100,
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
      responses: {
        200: {
          description: "Settings updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Merchant",
              },
            },
          },
        },
        403: {
          description: "Not authorized to access this merchant",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
};
