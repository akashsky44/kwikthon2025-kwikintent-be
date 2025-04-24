class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "ApiError";
  }
}

class ValidationError extends ApiError {
  constructor(message, errors = []) {
    super(400, message, errors);
    this.name = "ValidationError";
  }
}

class AuthenticationError extends ApiError {
  constructor(message = "Authentication failed") {
    super(401, message);
    this.name = "AuthenticationError";
  }
}

class AuthorizationError extends ApiError {
  constructor(message = "Not authorized to access this resource") {
    super(403, message);
    this.name = "AuthorizationError";
  }
}

class NotFoundError extends ApiError {
  constructor(resource = "Resource") {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

module.exports = {
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
};
