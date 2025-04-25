// Merchant Routes
module.exports = {
  "/merchants": {
    get: {
      tags: ["Merchants"],
      summary: "Get all merchants",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of merchants",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Merchant",
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Merchants"],
      summary: "Create new merchant",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Merchant",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Merchant created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Merchant",
              },
            },
          },
        },
      },
    },
  },
  "/merchants/{id}": {
    get: {
      tags: ["Merchants"],
      summary: "Get merchant by ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Merchant details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Merchant",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Merchants"],
      summary: "Update merchant",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Merchant",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Merchant updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Merchant",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Merchants"],
      summary: "Delete merchant",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Merchant deleted",
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
  "/merchants/{id}/settings": {
    get: {
      tags: ["Merchants"],
      summary: "Get merchant settings",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Merchant settings",
          content: {
            "application/json": {
              schema: {
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
    put: {
      tags: ["Merchants"],
      summary: "Update merchant settings",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
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
      },
    },
  },
  "/merchants/{id}/analytics": {
    get: {
      tags: ["Merchants"],
      summary: "Get merchant analytics",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Merchant analytics",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  overview: {
                    $ref: "#/components/schemas/AnalyticsOverview",
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
  "/merchants/{id}/integrate": {
    post: {
      tags: ["Merchants"],
      summary: "Integrate merchant store",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["platform", "shopDomain", "accessToken"],
              properties: {
                platform: {
                  type: "string",
                  enum: ["shopify", "woocommerce", "magento", "custom"],
                  example: "shopify",
                },
                shopDomain: {
                  type: "string",
                  example: "my-store.myshopify.com",
                },
                accessToken: {
                  type: "string",
                  example: "shpat_...",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Store integrated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  integration: {
                    type: "object",
                    properties: {
                      platform: {
                        type: "string",
                        example: "shopify",
                      },
                      status: {
                        type: "string",
                        example: "active",
                      },
                      installedAt: {
                        type: "string",
                        format: "date-time",
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
    delete: {
      tags: ["Merchants"],
      summary: "Remove store integration",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Integration removed successfully",
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
  "/merchants/{id}/integration-status": {
    get: {
      tags: ["Merchants"],
      summary: "Get store integration status",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "objectId",
          },
          description: "Merchant ID",
        },
      ],
      responses: {
        200: {
          description: "Integration status",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  integration: {
                    type: "object",
                    properties: {
                      platform: {
                        type: "string",
                        example: "shopify",
                      },
                      status: {
                        type: "string",
                        example: "active",
                      },
                      installedAt: {
                        type: "string",
                        format: "date-time",
                      },
                      lastSync: {
                        type: "string",
                        format: "date-time",
                      },
                      health: {
                        type: "object",
                        properties: {
                          status: {
                            type: "string",
                            enum: ["healthy", "warning", "error"],
                            example: "healthy",
                          },
                          message: {
                            type: "string",
                            example: "Integration is working properly",
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
    },
  },
};
