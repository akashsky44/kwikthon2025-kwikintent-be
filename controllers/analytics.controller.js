const Detection = require("../models/detection.model");
const Widget = require("../models/widget.model");
const { ApiError } = require("../utils/errors");

// @desc    Track widget interaction
// @route   POST /api/public/analytics/interaction/:widgetId
// @access  Public
exports.trackWidgetInteraction = async (req, res, next) => {
  try {
    const { sessionId, interactionType } = req.body;

    // Find detection by session ID
    const detection = await Detection.findOne({ sessionId });
    if (!detection) {
      throw new ApiError(404, "Session not found");
    }

    // Update detection with interaction details
    await detection.updateWidgetInteraction(interactionType);

    // Update widget interaction count
    const widget = await Widget.findById(req.params.widgetId);
    if (widget) {
      await widget.incrementInteractions();
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track conversion
// @route   POST /api/public/analytics/conversion/:sessionId
// @access  Public
exports.trackConversion = async (req, res, next) => {
  try {
    const { conversionType, conversionValue } = req.body;

    // Find detection by session ID
    const detection = await Detection.findOne({
      sessionId: req.params.sessionId,
    });
    if (!detection) {
      throw new ApiError(404, "Session not found");
    }

    // Update detection with conversion details
    await detection.updateConversion(conversionType, conversionValue);

    // Update widget conversion count if widget was shown
    if (detection.widgetShown) {
      const widget = await Widget.findById(detection.widgetShown);
      if (widget) {
        await widget.incrementConversions();
      }
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Track custom event
// @route   POST /api/public/analytics/event/:merchantId
// @access  Public
exports.trackEvent = async (req, res, next) => {
  try {
    const { sessionId, eventType, eventData } = req.body;

    // Find detection by session ID
    const detection = await Detection.findOne({
      sessionId,
      merchant: req.params.merchantId,
    });

    if (!detection) {
      throw new ApiError(404, "Session not found");
    }

    // Add event to detection events array
    detection.events = detection.events || [];
    detection.events.push({
      type: eventType,
      data: eventData,
      timestamp: Date.now(),
    });

    await detection.save();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
