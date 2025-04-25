// PDP Routes
module.exports = {
  "/pdp/analytics/overview": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Get PDP analytics overview",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "PDP analytics overview",
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
                      totalViews: {
                        type: "number",
                        example: 10000,
                      },
                      uniqueVisitors: {
                        type: "number",
                        example: 5000,
                      },
                      averageTimeOnPage: {
                        type: "number",
                        example: 120,
                      },
                      bounceRate: {
                        type: "number",
                        example: 35.5,
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
  "/pdp/analytics/intent-distribution": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Get PDP intent distribution",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "PDP intent distribution data",
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
  "/pdp/analytics/conversion-rates": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Get PDP conversion rates",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "PDP conversion rates data",
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
  "/pdp/analytics/widget-performance": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Get PDP widget performance",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "PDP widget performance data",
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
                        example: 10000,
                      },
                      interactions: {
                        type: "number",
                        example: 2500,
                      },
                      interactionRate: {
                        type: "number",
                        example: 25,
                      },
                      conversionRate: {
                        type: "number",
                        example: 3.5,
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
  "/pdp/export/analytics": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Export PDP analytics data",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Analytics data export",
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
                      overview: {
                        type: "object",
                      },
                      intentDistribution: {
                        type: "object",
                      },
                      conversionRates: {
                        type: "object",
                      },
                      widgetPerformance: {
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
    },
  },
  "/pdp/export/detections": {
    get: {
      tags: ["PDP Analytics"],
      summary: "Export PDP intent detections",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Intent detections export",
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
                        },
                        sessionId: {
                          type: "string",
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
                        },
                        behavioralSignals: {
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
      },
    },
  },
};
