const Widget = require("../models/widget.model");
const { ApiError } = require("../utils/errors");

// @desc    Create a new widget
// @route   POST /api/widgets
// @access  Private
exports.createWidget = async (req, res, next) => {
  try {
    const widget = await Widget.create({
      ...req.body,
      merchant: req.user.merchant,
    });

    await widget.populate("merchant", "name domain");

    res.status(201).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all widgets
// @route   GET /api/widgets
// @access  Private
exports.getAllWidgets = async (req, res, next) => {
  try {
    const widgets = await Widget.find({ merchant: req.user.merchant }).populate(
      "merchant",
      "name domain"
    );

    res.status(200).json({
      success: true,
      data: widgets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget by ID
// @route   GET /api/widgets/:id
// @access  Private
exports.getWidgetById = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update widget
// @route   PUT /api/widgets/:id
// @access  Private
exports.updateWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      req.body,
      { new: true, runValidators: true }
    ).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete widget
// @route   DELETE /api/widgets/:id
// @access  Private
exports.deleteWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOneAndDelete({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Activate widget
// @route   PUT /api/widgets/:id/activate
// @access  Private
exports.activateWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { isActive: true },
      { new: true }
    ).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate widget
// @route   PUT /api/widgets/:id/deactivate
// @access  Private
exports.deactivateWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { isActive: false },
      { new: true }
    ).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update widget display rules
// @route   PUT /api/widgets/:id/display-rules
// @access  Private
exports.updateDisplayRules = async (req, res, next) => {
  try {
    const widget = await Widget.findOneAndUpdate(
      { _id: req.params.id, merchant: req.user.merchant },
      { displayRules: req.body },
      { new: true, runValidators: true }
    ).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget performance stats
// @route   GET /api/widgets/:id/performance
// @access  Private
exports.getWidgetPerformance = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    res.status(200).json({
      success: true,
      data: widget.performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget interactions
// @route   GET /api/widgets/:id/interactions
// @access  Private
exports.getWidgetInteractions = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    const interactionRate =
      widget.performance.impressions > 0
        ? (widget.performance.interactions / widget.performance.impressions) *
          100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        impressions: widget.performance.impressions,
        interactions: widget.performance.interactions,
        interactionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget conversion rate
// @route   GET /api/widgets/:id/conversion-rate
// @access  Private
exports.getWidgetConversionRate = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    const conversionRate =
      widget.performance.impressions > 0
        ? (widget.performance.conversions / widget.performance.impressions) *
          100
        : 0;

    res.status(200).json({
      success: true,
      data: {
        impressions: widget.performance.impressions,
        conversions: widget.performance.conversions,
        conversionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create multiple widgets
// @route   POST /api/widgets/bulk-create
// @access  Private
exports.createMultipleWidgets = async (req, res, next) => {
  try {
    const widgets = req.body.map((widget) => ({
      ...widget,
      merchant: req.user.merchant,
    }));

    const createdWidgets = await Widget.insertMany(widgets);
    await Widget.populate(createdWidgets, {
      path: "merchant",
      select: "name domain",
    });

    res.status(201).json({
      success: true,
      data: createdWidgets,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update multiple widgets
// @route   PUT /api/widgets/bulk-update
// @access  Private
exports.updateMultipleWidgets = async (req, res, next) => {
  try {
    const updates = req.body.map(async ({ id, ...update }) => {
      return Widget.findOneAndUpdate(
        { _id: id, merchant: req.user.merchant },
        update,
        { new: true, runValidators: true }
      ).populate("merchant", "name domain");
    });

    const updatedWidgets = await Promise.all(updates);

    res.status(200).json({
      success: true,
      data: updatedWidgets.filter((widget) => widget !== null),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete multiple widgets
// @route   DELETE /api/widgets/bulk-delete
// @access  Private
exports.deleteMultipleWidgets = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const result = await Widget.deleteMany({
      _id: { $in: ids },
      merchant: req.user.merchant,
    });

    res.status(200).json({
      success: true,
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Test widget
// @route   POST /api/widgets/:id/test
// @access  Private
exports.testWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    // Simulate widget display with test data
    const testData = {
      product: req.body.product || {
        id: "test_product",
        name: "Test Product",
        price: 99.99,
        currency: "USD",
      },
      customer: req.body.customer || {
        type: "new",
        device: "desktop",
      },
    };

    // Apply display rules
    const shouldDisplay = evaluateDisplayRules(widget.displayRules, testData);

    res.status(200).json({
      success: true,
      data: {
        widget,
        testData,
        shouldDisplay,
        renderedContent: shouldDisplay
          ? generateWidgetContent(widget, testData)
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Preview widget
// @route   GET /api/widgets/:id/preview
// @access  Private
exports.previewWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findOne({
      _id: req.params.id,
      merchant: req.user.merchant,
    }).populate("merchant", "name domain");

    if (!widget) {
      throw new ApiError(404, "Widget not found");
    }

    // Generate preview HTML
    const previewHtml = generateWidgetPreview(widget);

    res.status(200).json({
      success: true,
      data: {
        widget,
        previewHtml,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Helper functions
function evaluateDisplayRules(rules, data) {
  if (!rules) return true;

  const { product, customer } = data;

  // Check price range
  if (rules.minPrice && product.price < rules.minPrice) return false;
  if (rules.maxPrice && product.price > rules.maxPrice) return false;

  // Check categories
  if (rules.categories && rules.categories.length > 0) {
    if (!product.category || !rules.categories.includes(product.category)) {
      return false;
    }
  }

  // Check excluded products
  if (rules.excludedProducts && rules.excludedProducts.includes(product.id)) {
    return false;
  }

  // Check device types
  if (rules.deviceTypes && rules.deviceTypes.length > 0) {
    if (!customer.device || !rules.deviceTypes.includes(customer.device)) {
      return false;
    }
  }

  return true;
}

function generateWidgetContent(widget, data) {
  const { content } = widget;
  let { message } = content;

  // Replace dynamic values
  message = message.replace("{stock}", data.product.stock || "5");
  message = message.replace(
    "{price}",
    `${data.product.currency} ${data.product.price}`
  );

  return {
    ...content,
    message,
  };
}

function generateWidgetPreview(widget) {
  const { content, styling } = widget;

  return `
    <div class="widget-preview" style="
      background-color: ${styling.colors.background};
      color: ${styling.colors.text};
      padding: 15px;
      border-radius: 8px;
      font-family: system-ui;
      max-width: 400px;
    ">
      <h4 style="
        margin: 0 0 10px 0;
        color: ${styling.colors.accent};
      ">${content.title}</h4>
      <p style="margin: 0 0 5px 0;">${content.message}</p>
      ${
        content.additionalText
          ? `
        <p style="
          margin: 5px 0 0 0;
          font-size: 0.9em;
          opacity: 0.8;
        ">${content.additionalText}</p>
      `
          : ""
      }
    </div>
  `;
}
