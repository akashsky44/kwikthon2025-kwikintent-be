// Intent Rules Routes
module.exports = {
  "/intent-rules": {
    get: {
      tags: ["Intent Rules"],
      summary: "Get all intent rules",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of intent rules",
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
                      $ref: "#/components/schemas/IntentRule",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Intent Rules"],
      summary: "Create new intent rule",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["type", "threshold", "behavioralSignals"],
              properties: {
                type: {
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
              },
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
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  data: {
                    $ref: "#/components/schemas/IntentRule",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/intent-rules/{type}": {
    get: {
      tags: ["Intent Rules"],
      summary: "Get intent rule by type",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "type",
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
          description: "Intent rule details",
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
                    $ref: "#/components/schemas/IntentRule",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["Intent Rules"],
      summary: "Update intent rule",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "type",
          required: true,
          schema: {
            type: "string",
            enum: ["high-intent", "price-sensitive", "just-browsing"],
          },
          description: "Intent type",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Intent rule updated",
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
                    $ref: "#/components/schemas/IntentRule",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Intent Rules"],
      summary: "Delete intent rule",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "type",
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
          description: "Intent rule deleted",
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
