const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/errors");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "No token provided");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).populate(
      "merchant",
      "name domain"
    );
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      merchant: user.merchant._id,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      next(new ApiError(401, "Invalid token"));
    } else if (error.name === "TokenExpiredError") {
      next(new ApiError(401, "Token expired"));
    } else {
      next(error);
    }
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Not authorized to access this route");
    }
    next();
  };
};

// Middleware to check if user has access to merchant data
const checkMerchantAccess = (req, res, next) => {
  try {
    const requestedMerchantId = req.params.merchantId || req.body.merchant;

    if (
      requestedMerchantId &&
      requestedMerchantId !== req.user.merchant.toString()
    ) {
      throw new ApiError(403, "Not authorized to access this merchant's data");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate, authorize, checkMerchantAccess };
