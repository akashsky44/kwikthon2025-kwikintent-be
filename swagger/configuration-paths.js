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
              $ref: "#/components/schemas/Configuration",
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
                $ref: "#/components/schemas/Configuration",
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
                $ref: "#/components/schemas/Configuration",
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
                type: "array",
                items: {
                  $ref: "#/components/schemas/Configuration",
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
              $ref: "#/components/schemas/Configuration",
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
                $ref: "#/components/schemas/Configuration",
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
  "/configuration/intent-rules": {
    get: {
      tags: ["Configuration"],
      summary: "Get all intent rules configuration",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Intent rules configuration",
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
  },
  "/configuration/intent-rules/{type}": {
    get: {
      tags: ["Configuration"],
      summary: "Get intent rules by type",
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
          description: "Intent rules for type",
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
    put: {
      tags: ["Configuration"],
      summary: "Update intent rules for type",
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
              $ref: "#/components/schemas/IntentRule",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Intent rules updated",
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
  "/configuration/widget-settings": {
    get: {
      tags: ["Configuration"],
      summary: "Get all widget settings",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Widget settings",
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
  },
  "/configuration/export": {
    get: {
      tags: ["Configuration"],
      summary: "Export complete configuration",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Configuration export",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  configuration: {
                    $ref: "#/components/schemas/Configuration",
                  },
                  intentRules: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/IntentRule",
                    },
                  },
                  widgetSettings: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Widget",
                    },
                  },
                  checkoutFactors: {
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
  "/configuration/import": {
    post: {
      tags: ["Configuration"],
      summary: "Import complete configuration",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                configuration: {
                  $ref: "#/components/schemas/Configuration",
                },
                intentRules: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/IntentRule",
                  },
                },
                widgetSettings: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Widget",
                  },
                },
                checkoutFactors: {
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
      responses: {
        200: {
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
              $ref: "#/components/schemas/Configuration",
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
