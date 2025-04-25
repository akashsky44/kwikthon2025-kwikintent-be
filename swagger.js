const getBaseUrl = () => {
  const host = process.env.API_HOST || "http://localhost:3000";
  const basePath = process.env.API_BASE_PATH || "/api";
  return `${host}${basePath}`;
};

const getEnvironmentServers = () => {
  const baseUrl = getBaseUrl();
  return [
    {
      url: baseUrl,
      description: `${process.env.NODE_ENV || "development"} server`,
    },
  ];
};

const schemas = require("./swagger/schemas");
const paths = require("./swagger/paths");

const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    title: "KwikIntent API",
    version: "1.0.0",
    description: "API documentation for KwikIntent backend services",
  },
  servers: getEnvironmentServers(),
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: schemas,
  },
  paths: paths,
};

module.exports = swaggerConfig;
