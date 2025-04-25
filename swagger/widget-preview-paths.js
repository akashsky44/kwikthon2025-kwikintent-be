module.exports = {
  "/widgets/preview/{intentType}": {
    get: {
      tags: ["Widget Preview"],
      summary: "Get widget preview configuration",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "intentType",
          required: true,
          schema: {
            type: "string",
            enum: ["high-intent", "price-sensitive", "just-browsing"],
          },
          description: "Type of user intent",
        },
        {
          in: "query",
          name: "productId",
          schema: {
            type: "string",
          },
          description: "Optional product ID for context",
        },
      ],
      responses: {
        200: {
          description: "Widget preview configuration",
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
                      type: {
                        type: "string",
                        enum: ["urgency", "discount", "social-proof"],
                      },
                      styling: {
                        type: "object",
                        properties: {
                          position: {
                            type: "string",
                            enum: [
                              "above-price",
                              "below-price",
                              "above-add-to-cart",
                              "below-add-to-cart",
                            ],
                          },
                          colors: {
                            type: "object",
                            properties: {
                              background: { type: "string" },
                              text: { type: "string" },
                              accent: { type: "string" },
                            },
                          },
                        },
                      },
                      content: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          message: { type: "string" },
                          additionalText: { type: "string" },
                        },
                      },
                      theme: {
                        type: "object",
                        properties: {
                          primary: { type: "string" },
                          background: { type: "string" },
                          border: { type: "string" },
                          text: { type: "string" },
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
  "/widgets/preview/{intentType}/settings": {
    put: {
      tags: ["Widget Preview"],
      summary: "Update widget preview settings",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "intentType",
          required: true,
          schema: {
            type: "string",
            enum: ["high-intent", "price-sensitive", "just-browsing"],
          },
          description: "Type of user intent",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                styling: {
                  type: "object",
                  properties: {
                    position: {
                      type: "string",
                      enum: [
                        "above-price",
                        "below-price",
                        "above-add-to-cart",
                        "below-add-to-cart",
                      ],
                    },
                    colors: {
                      type: "object",
                      properties: {
                        background: { type: "string" },
                        text: { type: "string" },
                        accent: { type: "string" },
                      },
                    },
                  },
                },
                content: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    message: { type: "string" },
                    additionalText: { type: "string" },
                  },
                },
                settings: {
                  type: "object",
                  properties: {
                    showCountdown: { type: "boolean" },
                    countdownDuration: { type: "number" },
                    showStockLevel: { type: "boolean" },
                    showRecentActivity: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Widget settings updated",
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
  "/widgets/preview/product/{productId}": {
    get: {
      tags: ["Widget Preview"],
      summary: "Get preview product data",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "productId",
          required: true,
          schema: {
            type: "string",
          },
          description: "Product ID",
        },
      ],
      responses: {
        200: {
          description: "Product data for preview",
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
                      id: { type: "string" },
                      name: { type: "string" },
                      price: { type: "number" },
                      originalPrice: { type: "number" },
                      discount: { type: "string" },
                      rating: { type: "number" },
                      reviewCount: { type: "number" },
                      features: {
                        type: "array",
                        items: { type: "string" },
                      },
                      images: {
                        type: "array",
                        items: { type: "string" },
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
