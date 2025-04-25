const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", routes);

// Error Handler
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Start server
const environment = process.env.NODE_ENV || "development";
app.listen(PORT, () => {
  console.log(`Server running in ${environment} mode on port ${PORT}`);
  console.log(
    `API Documentation available at ${process.env.API_HOST}/api-docs`
  );
});
