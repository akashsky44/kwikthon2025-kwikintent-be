// Dashboard Routes
module.exports = {
  "/dashboard/metrics": {
    get: {
      tags: ["Dashboard"],
      summary: "Get dashboard metrics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Dashboard metrics",
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
                      totalDetections: {
                        type: "number",
                        example: 10000,
                      },
                      uniqueVisitors: {
                        type: "number",
                        example: 5000,
                      },
                      conversionRate: {
                        type: "number",
                        example: 2.8,
                      },
                      averageIntentScore: {
                        type: "number",
                        example: 65.5,
                      },
                      widgetImpressions: {
                        type: "number",
                        example: 8000,
                      },
                      widgetInteractions: {
                        type: "number",
                        example: 2000,
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
  "/dashboard/recent-detections": {
    get: {
      tags: ["Dashboard"],
      summary: "Get recent intent detections",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Recent detections list",
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
                        timestamp: {
                          type: "string",
                          format: "date-time",
                        },
                        visitorId: {
                          type: "string",
                          example: "v_abc123",
                        },
                        intentType: {
                          type: "string",
                          enum: [
                            "high-intent",
                            "price-sensitive",
                            "just-browsing",
                          ],
                        },
                        intentScore: {
                          type: "number",
                          example: 85,
                        },
                        product: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            price: {
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
  "/dashboard/widget-stats": {
    get: {
      tags: ["Dashboard"],
      summary: "Get widget performance statistics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Widget statistics",
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
                      totalImpressions: {
                        type: "number",
                        example: 10000,
                      },
                      totalInteractions: {
                        type: "number",
                        example: 2500,
                      },
                      interactionRate: {
                        type: "number",
                        example: 25,
                      },
                      byWidgetType: {
                        type: "object",
                        properties: {
                          urgency: {
                            type: "object",
                            properties: {
                              impressions: {
                                type: "number",
                                example: 4000,
                              },
                              interactions: {
                                type: "number",
                                example: 1200,
                              },
                              conversionRate: {
                                type: "number",
                                example: 4.2,
                              },
                            },
                          },
                          discount: {
                            type: "object",
                            properties: {
                              impressions: {
                                type: "number",
                                example: 3500,
                              },
                              interactions: {
                                type: "number",
                                example: 800,
                              },
                              conversionRate: {
                                type: "number",
                                example: 3.1,
                              },
                            },
                          },
                          socialProof: {
                            type: "object",
                            properties: {
                              impressions: {
                                type: "number",
                                example: 2500,
                              },
                              interactions: {
                                type: "number",
                                example: 500,
                              },
                              conversionRate: {
                                type: "number",
                                example: 2.8,
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
  "/dashboard/intent-trends": {
    get: {
      tags: ["Dashboard"],
      summary: "Get intent distribution trends",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Intent trends data",
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
                      daily: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            date: {
                              type: "string",
                              format: "date",
                            },
                            highIntent: {
                              type: "number",
                            },
                            priceSensitive: {
                              type: "number",
                            },
                            justBrowsing: {
                              type: "number",
                            },
                          },
                        },
                      },
                      weekly: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            week: {
                              type: "string",
                            },
                            highIntent: {
                              type: "number",
                            },
                            priceSensitive: {
                              type: "number",
                            },
                            justBrowsing: {
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
  "/dashboard/conversion-stats": {
    get: {
      tags: ["Dashboard"],
      summary: "Get conversion statistics",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Conversion statistics",
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
                      overall: {
                        type: "number",
                        example: 2.8,
                      },
                      byIntent: {
                        type: "object",
                        properties: {
                          highIntent: {
                            type: "number",
                            example: 5.2,
                          },
                          priceSensitive: {
                            type: "number",
                            example: 2.1,
                          },
                          justBrowsing: {
                            type: "number",
                            example: 1.2,
                          },
                        },
                      },
                      trends: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            date: {
                              type: "string",
                              format: "date",
                            },
                            rate: {
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
};
