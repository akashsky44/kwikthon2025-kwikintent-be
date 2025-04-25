// Configuration Routes
module.exports = {
  "/configuration": {
    post: {
      tags: ["Configuration"],
      summary: "Create new configuration",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["settings"],
              properties: {
                settings: {
                  type: "object",
                  required: ["widgetPlacement", "intentThresholds"],
                  properties: {
                    widgetPlacement: {
                      type: "string",
                      enum: ["below-price", "above-button"],
                      example: "below-price",
                    },
                    intentThresholds: {
                      type: "object",
                      required: ["highIntent", "priceSensitive"],
                      properties: {
                        highIntent: {
                          type: "number",
                          minimum: 0,
                          maximum: 100,
                          example: 70,
                        },
                        priceSensitive: {
                          type: "number",
                          minimum: 0,
                          maximum: 100,
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
      responses: {
        201: {
          description: "Configuration created",
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
                      _id: {
                        type: "string",
                        format: "objectId",
                        example: "507f1f77bcf86cd799439011",
                      },
                      merchant: {
                        type: "string",
                        format: "objectId",
                        example: "507f1f77bcf86cd799439011",
                      },
                      settings: {
                        type: "object",
                        properties: {
                          widgetPlacement: {
                            type: "string",
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
                      isActive: {
                        type: "boolean",
                        example: true,
                      },
                      version: {
                        type: "number",
                        example: 1,
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                      },
                      updatedAt: {
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
    get: {
      tags: ["Configuration"],
      summary: "Get active configuration",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Active configuration",
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
                      _id: {
                        type: "string",
                        format: "objectId",
                      },
                      merchant: {
                        type: "string",
                        format: "objectId",
                      },
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
                              },
                              priceSensitive: {
                                type: "number",
                              },
                            },
                          },
                        },
                      },
                      isActive: {
                        type: "boolean",
                      },
                      version: {
                        type: "number",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                      },
                      updatedAt: {
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
  },
  "/configuration/history": {
    get: {
      tags: ["Configuration"],
      summary: "Get configuration history",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Configuration history",
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
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          format: "objectId",
                        },
                        merchant: {
                          type: "string",
                          format: "objectId",
                        },
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
                                },
                                priceSensitive: {
                                  type: "number",
                                },
                              },
                            },
                          },
                        },
                        isActive: {
                          type: "boolean",
                        },
                        version: {
                          type: "number",
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                        },
                        updatedAt: {
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
    },
  },
  "/configuration/{id}": {
    put: {
      tags: ["Configuration"],
      summary: "Update configuration",
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
          description: "Configuration ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["settings"],
              properties: {
                settings: {
                  type: "object",
                  required: ["widgetPlacement", "intentThresholds"],
                  properties: {
                    widgetPlacement: {
                      type: "string",
                      enum: ["below-price", "above-button"],
                    },
                    intentThresholds: {
                      type: "object",
                      required: ["highIntent", "priceSensitive"],
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
          description: "Configuration updated",
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
                      _id: {
                        type: "string",
                        format: "objectId",
                      },
                      merchant: {
                        type: "string",
                        format: "objectId",
                      },
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
                              },
                              priceSensitive: {
                                type: "number",
                              },
                            },
                          },
                        },
                      },
                      isActive: {
                        type: "boolean",
                      },
                      version: {
                        type: "number",
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                      },
                      updatedAt: {
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
      tags: ["Configuration"],
      summary: "Delete configuration",
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
          description: "Configuration ID",
        },
      ],
      responses: {
        200: {
          description: "Configuration deleted",
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
  "/configuration/export": {
    get: {
      tags: ["Configuration"],
      summary: "Export configuration",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Configuration export",
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
                              },
                              priceSensitive: {
                                type: "number",
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
    },
  },
  "/configuration/import": {
    post: {
      tags: ["Configuration"],
      summary: "Import configuration",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["settings"],
              properties: {
                settings: {
                  type: "object",
                  required: ["widgetPlacement", "intentThresholds"],
                  properties: {
                    widgetPlacement: {
                      type: "string",
                      enum: ["below-price", "above-button"],
                    },
                    intentThresholds: {
                      type: "object",
                      required: ["highIntent", "priceSensitive"],
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
        201: {
          description: "Configuration imported",
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
                      _id: {
                        type: "string",
                        format: "objectId",
                      },
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
                              },
                              priceSensitive: {
                                type: "number",
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
    },
  },
  "/configuration/validate": {
    post: {
      tags: ["Configuration"],
      summary: "Validate configuration",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["settings"],
              properties: {
                settings: {
                  type: "object",
                  required: ["widgetPlacement", "intentThresholds"],
                  properties: {
                    widgetPlacement: {
                      type: "string",
                      enum: ["below-price", "above-button"],
                    },
                    intentThresholds: {
                      type: "object",
                      required: ["highIntent", "priceSensitive"],
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
          description: "Validation results",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  errors: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    example: [],
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
