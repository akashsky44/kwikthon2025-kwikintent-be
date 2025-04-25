const User = require("../models/user.model");
const { ApiError, ValidationError } = require("../utils/errors");

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { email, password, merchant } = req.body;

    // Validate required fields
    if (!email || !password || !merchant) {
      throw new ValidationError(
        "Please provide email, password and merchant ID"
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError("User already exists");
    }

    // Create user
    const user = await User.create({
      email,
      password,
      merchant,
    });

    // Generate token
    const token = user.getSignedToken();

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      throw new ValidationError("Please provide email and password");
    }

    // Check for user
    const user = await User.findOne({ email })
      .select("+password")
      .populate("merchant", "name domain");

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate token
    const token = user.getSignedToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "merchant",
      "name domain"
    );
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/auth/me
// @access  Private
exports.updateCurrentUser = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    }).populate("merchant", "name domain");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId).populate(
      "merchant",
      "name domain"
    );
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const token = user.getSignedToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};
