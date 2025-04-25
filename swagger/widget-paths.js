// Widget Routes
module.exports = {
  "/widgets": {
    post: {
      tags: ["Widgets"],
      summary: "Create new widget",
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
    get: {
      tags: ["Widgets"],
      summary: "Get all widgets",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of widgets",
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
  "/widgets/{id}": {
    get: {
      tags: ["Widgets"],
      summary: "Get widget by ID",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget details",
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
    put: {
      tags: ["Widgets"],
      summary: "Update widget",
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
          description: "Widget ID",
        },
      ],
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
        200: {
          description: "Widget updated",
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
    delete: {
      tags: ["Widgets"],
      summary: "Delete widget",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget deleted",
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
  "/widgets/{id}/activate": {
    put: {
      tags: ["Widgets"],
      summary: "Activate widget",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget activated",
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
  "/widgets/{id}/deactivate": {
    put: {
      tags: ["Widgets"],
      summary: "Deactivate widget",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget deactivated",
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
  "/widgets/{id}/display-rules": {
    put: {
      tags: ["Widgets"],
      summary: "Update widget display rules",
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
          description: "Widget ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                minOrderValue: {
                  type: "number",
                  example: 50,
                },
                maxOrderValue: {
                  type: "number",
                  example: 500,
                },
                customerTypes: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["new", "returning", "vip"],
                  },
                },
                deviceTypes: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["mobile", "tablet", "desktop"],
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Display rules updated",
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
  "/widgets/{id}/performance": {
    get: {
      tags: ["Widgets"],
      summary: "Get widget performance stats",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget performance statistics",
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
  "/widgets/{id}/interactions": {
    get: {
      tags: ["Widgets"],
      summary: "Get widget interactions",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget interactions data",
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
                      interactionRate: {
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
  "/widgets/{id}/conversion-rate": {
    get: {
      tags: ["Widgets"],
      summary: "Get widget conversion rate",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget conversion rate data",
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
                      conversions: {
                        type: "number",
                        example: 50,
                      },
                      conversionRate: {
                        type: "number",
                        example: 5,
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
  "/widgets/bulk-create": {
    post: {
      tags: ["Widgets"],
      summary: "Create multiple widgets",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
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
      responses: {
        201: {
          description: "Widgets created",
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
  "/widgets/bulk-update": {
    put: {
      tags: ["Widgets"],
      summary: "Update multiple widgets",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                required: ["id"],
                properties: {
                  id: {
                    type: "string",
                    format: "objectId",
                  },
                  content: {
                    type: "object",
                  },
                  styling: {
                    type: "object",
                  },
                  settings: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Widgets updated",
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
  "/widgets/bulk-delete": {
    delete: {
      tags: ["Widgets"],
      summary: "Delete multiple widgets",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["ids"],
              properties: {
                ids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "objectId",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Widgets deleted",
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
                      deletedCount: {
                        type: "number",
                        example: 3,
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
  "/widgets/{id}/test": {
    post: {
      tags: ["Widgets"],
      summary: "Test widget with sample data",
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
          description: "Widget ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                product: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: "test_product",
                    },
                    name: {
                      type: "string",
                      example: "Test Product",
                    },
                    price: {
                      type: "number",
                      example: 99.99,
                    },
                    currency: {
                      type: "string",
                      example: "USD",
                    },
                  },
                },
                customer: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                      example: "new",
                    },
                    device: {
                      type: "string",
                      example: "desktop",
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
          description: "Widget test results",
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
                      widget: {
                        $ref: "#/components/schemas/Widget",
                      },
                      testData: {
                        type: "object",
                      },
                      shouldDisplay: {
                        type: "boolean",
                      },
                      renderedContent: {
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
  "/widgets/{id}/preview": {
    get: {
      tags: ["Widgets"],
      summary: "Get widget preview HTML",
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
          description: "Widget ID",
        },
      ],
      responses: {
        200: {
          description: "Widget preview",
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
                      widget: {
                        $ref: "#/components/schemas/Widget",
                      },
                      previewHtml: {
                        type: "string",
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
