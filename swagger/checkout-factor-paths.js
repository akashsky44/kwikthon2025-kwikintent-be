// Checkout Factor Routes
module.exports = {
  "/checkout-factors/{id}": {
    get: {
      tags: ["Checkout Factors"],
      summary: "Get checkout factor by ID",
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
          description: "Checkout Factor ID",
        },
      ],
      responses: {
        200: {
          description: "Checkout factor details",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Checkout Factors"],
      summary: "Update checkout factor",
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
          description: "Checkout Factor ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CheckoutFactor",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Checkout factor updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Checkout Factors"],
      summary: "Delete checkout factor",
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
          description: "Checkout Factor ID",
        },
      ],
      responses: {
        200: {
          description: "Checkout factor deleted",
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
  "/checkout-factors/{id}/activate": {
    put: {
      tags: ["Checkout Factors"],
      summary: "Activate checkout factor",
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
          description: "Checkout Factor ID",
        },
      ],
      responses: {
        200: {
          description: "Checkout factor activated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
    },
  },
  "/checkout-factors/{id}/deactivate": {
    put: {
      tags: ["Checkout Factors"],
      summary: "Deactivate checkout factor",
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
          description: "Checkout Factor ID",
        },
      ],
      responses: {
        200: {
          description: "Checkout factor deactivated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
    },
  },
  "/checkout-factors/{id}/strategies": {
    put: {
      tags: ["Checkout Factors"],
      summary: "Update checkout factor strategies",
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
          description: "Checkout Factor ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                strategies: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        enum: ["discount", "urgency", "social-proof"],
                      },
                      config: {
                        type: "object",
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
          description: "Strategies updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
    },
  },
  "/checkout-factors/{id}/performance": {
    get: {
      tags: ["Checkout Factors"],
      summary: "Get checkout factor performance",
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
          description: "Checkout Factor ID",
        },
      ],
      responses: {
        200: {
          description: "Performance statistics",
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
  "/checkout-factors/types/{type}": {
    get: {
      tags: ["Checkout Factors"],
      summary: "Get checkout factors by type",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "type",
          required: true,
          schema: {
            type: "string",
            enum: [
              "payment-friction",
              "shipping-concerns",
              "trust-concerns",
              "price-sensitivity",
              "urgency",
              "social-proof",
            ],
          },
          description: "Factor type",
        },
      ],
      responses: {
        200: {
          description: "List of checkout factors",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/CheckoutFactor",
                },
              },
            },
          },
        },
      },
    },
  },
  "/checkout-factors/intent/{intentType}": {
    get: {
      tags: ["Checkout Factors"],
      summary: "Get checkout factors by intent type",
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
          description: "Intent type",
        },
      ],
      responses: {
        200: {
          description: "List of checkout factors",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/CheckoutFactor",
                },
              },
            },
          },
        },
      },
    },
  },
  "/checkout-factors/bulk-create": {
    post: {
      tags: ["Checkout Factors"],
      summary: "Create multiple checkout factors",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/CheckoutFactor",
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Checkout factors created",
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
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/CheckoutFactor",
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
