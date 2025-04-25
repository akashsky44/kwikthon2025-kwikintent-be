const Widget = require("../models/widget.model");
const { ApiError } = require("../utils/errors");

// @desc    Get widget preview configuration
// @route   GET /api/widgets/preview/:intentType
// @access  Private
exports.getWidgetPreview = async (req, res, next) => {
  try {
    const { intentType } = req.params;
    const { productId } = req.query;

    // Validate intent type
    if (
      !["high-intent", "price-sensitive", "just-browsing"].includes(intentType)
    ) {
      throw new ApiError(400, "Invalid intent type");
    }

    // Get base widget configuration
    const widget = await Widget.findOne({
      merchant: req.user.merchant,
      intentType,
      isActive: true,
    }).sort({ version: -1 });

    if (!widget) {
      throw new ApiError(404, "Widget configuration not found");
    }

    // Generate preview data based on intent type
    let previewData = {
      type: widget.widgetType,
      styling: widget.styling,
      settings: widget.settings,
    };

    switch (intentType) {
      case "high-intent":
        previewData = {
          ...previewData,
          content: {
            title: "Limited Time Offer!",
            message: "Only 5 left in stock at this price. Order now!",
            additionalText: "Offer expires soon",
            countdownDuration: 900, // 15 minutes in seconds
            paymentOptions: {
              title: "Pay now and save!",
              discount: "5% OFF",
              methods: ["UPI", "Credit Card", "Debit Card"],
            },
          },
          theme: {
            primary: "#f43f5e",
            background: "#fef2f2",
            border: "#fecaca",
            text: "#be123c",
          },
        };
        break;

      case "price-sensitive":
        previewData = {
          ...previewData,
          content: {
            title: "Special offer just for you!",
            message: "Use this exclusive discount code at checkout:",
            discountCode: "SAVE10",
            discountValue: "10% OFF",
            additionalText: "*Limited time offer. One-time use only.",
            bundleOffer: {
              title: "Bundle & Save More!",
              message:
                "Add these items to your cart and save an additional 15%:",
              items: [
                {
                  name: "Carrying Case",
                  price: "₹499",
                  image: "/placeholder.svg",
                },
                {
                  name: "Extra Ear Pads",
                  price: "₹299",
                  image: "/placeholder.svg",
                },
              ],
            },
          },
          theme: {
            primary: "#f97316",
            background: "#fff7ed",
            border: "#fed7aa",
            text: "#c2410c",
          },
        };
        break;

      case "just-browsing":
        previewData = {
          ...previewData,
          content: {
            title: "Popular Choice!",
            message: "120+ people purchased this item in the last 24 hours!",
            socialProof: {
              recentBuyers: [
                { alt: "User 1", fallback: "U1" },
                { alt: "User 2", fallback: "U2" },
                { alt: "User 3", fallback: "U3" },
              ],
            },
            reviews: [
              {
                rating: 5,
                title: "Amazing sound quality!",
                text: "These headphones have incredible sound quality and the noise cancellation is top-notch. Highly recommend!",
              },
              {
                rating: 4,
                title: "Great battery life",
                text: "The battery lasts forever! I can go days without charging them.",
              },
            ],
          },
          theme: {
            primary: "#3b82f6",
            background: "#eff6ff",
            border: "#bfdbfe",
            text: "#1d4ed8",
          },
        };
        break;
    }

    res.status(200).json({
      success: true,
      data: previewData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update widget preview settings
// @route   PUT /api/widgets/preview/:intentType/settings
// @access  Private
exports.updateWidgetPreviewSettings = async (req, res, next) => {
  try {
    const { intentType } = req.params;
    const { styling, content, settings } = req.body;

    // Validate intent type
    if (
      !["high-intent", "price-sensitive", "just-browsing"].includes(intentType)
    ) {
      throw new ApiError(400, "Invalid intent type");
    }

    // Get widget to update
    const widget = await Widget.findOneAndUpdate(
      {
        merchant: req.user.merchant,
        intentType,
        isActive: true,
      },
      {
        styling,
        content,
        settings,
      },
      { new: true, runValidators: true }
    );

    if (!widget) {
      throw new ApiError(404, "Widget configuration not found");
    }

    res.status(200).json({
      success: true,
      data: widget,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget preview product data
// @route   GET /api/widgets/preview/product/:productId
// @access  Private
exports.getPreviewProductData = async (req, res, next) => {
  try {
    // This would typically fetch real product data
    // For preview purposes, returning mock data
    res.status(200).json({
      success: true,
      data: {
        id: req.params.productId || "preview_product",
        name: "Premium Wireless Headphones",
        price: 2999,
        originalPrice: 4999,
        discount: "40%",
        rating: 4,
        reviewCount: 128,
        features: [
          "Bluetooth 5.0 connectivity",
          "Active noise cancellation",
          "40 hours battery life",
          "Quick charge - 5 min charge for 2 hours playback",
          "Premium sound quality with deep bass",
        ],
        images: [
          "/placeholder.svg?height=400&width=400",
          ...Array(4).fill("/placeholder.svg?height=80&width=80"),
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};
