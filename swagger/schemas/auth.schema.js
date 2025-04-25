module.exports = {
  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "password123",
      },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          merchant: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "680ba07eb0f3532d513399b6",
              },
              name: {
                type: "string",
                example: "Example Store",
              },
              domain: {
                type: "string",
                example: "example-store.myshopify.com",
              },
            },
          },
        },
      },
    },
  },
  RegisterRequest: {
    type: "object",
    required: ["email", "password", "merchant"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "password123",
      },
      merchant: {
        type: "string",
        format: "objectId",
        description: "Merchant ID",
        example: "680ba07eb0f3532d513399b6",
      },
    },
  },
  RegisterResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          merchant: {
            type: "object",
            properties: {
              id: {
                type: "string",
                example: "680ba07eb0f3532d513399b6",
              },
              name: {
                type: "string",
                example: "Example Store",
              },
              domain: {
                type: "string",
                example: "example-store.myshopify.com",
              },
            },
          },
        },
      },
    },
  },
};
