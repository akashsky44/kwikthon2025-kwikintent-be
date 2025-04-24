const { ApiError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.warn(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((error) => error.message),
    });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate Key Error",
      errors: [`${Object.keys(err.keyValue)} already exists`],
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
  });
};

module.exports = { errorHandler };
