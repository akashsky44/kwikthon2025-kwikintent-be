const Detection = require("../models/detection.model");
const Widget = require("../models/widget.model");
const IntentRule = require("../models/intentRule.model");
const Merchant = require("../models/merchant.model");
const { ApiError } = require("../utils/errors");

// @desc    Poll user behavior and determine intent
// @route   POST /api/public/pdp/poll/:merchantId
// @access  Public
exports.pollUserBehavior = async (req, res, next) => {
  try {
    const { visitorId, sessionId, product, behavioralSignals, deviceInfo } =
      req.body;

    // Get merchant and active intent rules
    const merchant = await Merchant.findById(req.params.merchantId);
    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    const rules = await IntentRule.getActiveRules(merchant._id);
    if (!rules.length) {
      throw new ApiError(404, "No active intent rules found");
    }

    // Evaluate intent based on behavioral signals
    let highestScore = 0;
    let determinedIntent = null;

    for (const rule of rules) {
      const score = rule.evaluateSignals({
        ...behavioralSignals,
        deviceType: deviceInfo.type,
      });

      if (score >= rule.threshold && score > highestScore) {
        highestScore = score;
        determinedIntent = rule.intentType;
      }
    }

    // Get appropriate widget based on intent
    let widget = null;
    if (determinedIntent) {
      widget = await Widget.findOne({
        merchant: merchant._id,
        intentType: determinedIntent,
        isActive: true,
      }).sort({ version: -1 });
    }

    // Create or update detection record
    const detection = await Detection.findOneAndUpdate(
      { sessionId },
      {
        merchant: merchant._id,
        visitorId,
        sessionId,
        product,
        behavioralSignals,
        deviceInfo,
        intentType: determinedIntent,
        intentScore: highestScore,
        widgetShown: widget ? widget._id : null,
        timestamp: Date.now(),
      },
      { new: true, upsert: true }
    );

    // Increment widget impression if shown
    if (widget) {
      await widget.incrementImpressions();
    }

    // Return response with widget content if available
    res.status(200).json({
      success: true,
      data: {
        intent: determinedIntent,
        score: highestScore,
        widget: widget
          ? {
              type: widget.widgetType,
              content: widget.content,
              styling: widget.styling,
              settings: widget.settings,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget script for merchant
// @route   GET /api/public/pdp/widget-script/:merchantId
// @access  Public
exports.getWidgetScript = async (req, res, next) => {
  try {
    const merchant = await Merchant.findById(req.params.merchantId);
    if (!merchant) {
      throw new ApiError(404, "Merchant not found");
    }

    // Generate widget initialization script
    const script = `
      (function() {
        // Widget configuration
        const config = {
          merchantId: '${merchant._id}',
          placement: '${merchant.settings.widgetPlacement}',
          styles: ${JSON.stringify(merchant.settings.widgetStyles)},
          features: ${JSON.stringify(merchant.settings.features)}
        };

        // Initialize polling interval
        let pollInterval;
        const POLL_FREQUENCY = 5000; // 5 seconds

        // Track behavioral signals
        const signals = {
          timeOnPage: 0,
          scrollDepth: 0,
          imageViews: 0,
          addToCartHover: false,
          priceViewDuration: 0,
          comparisonViews: false,
          previousAbandonment: false,
          exitOnCheckout: false,
          productInteraction: false,
          categoryViews: 0
        };

        // Generate unique IDs
        const generateId = (prefix) => prefix + '_' + Math.random().toString(36).substr(2, 9);
        const visitorId = localStorage.getItem('kwik_visitor_id') || generateId('v');
        const sessionId = generateId('s');
        localStorage.setItem('kwik_visitor_id', visitorId);

        // Get product details
        const getProductDetails = () => {
          const productElement = document.querySelector('[data-product-id]');
          return {
            id: productElement.dataset.productId,
            name: productElement.dataset.productName,
            url: window.location.pathname,
            price: parseFloat(productElement.dataset.productPrice),
            currency: productElement.dataset.productCurrency
          };
        };

        // Get device info
        const getDeviceInfo = () => ({
          type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          userAgent: navigator.userAgent,
          screenSize: \`\${window.screen.width}x\${window.screen.height}\`
        });

        // Track behavioral signals
        const trackSignals = () => {
          // Time on page
          signals.timeOnPage = Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000);

          // Scroll depth
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          signals.scrollDepth = Math.round((window.scrollY / scrollHeight) * 100);

          // Product images
          document.querySelectorAll('.product-image').forEach(img => {
            img.addEventListener('click', () => signals.imageViews++);
          });

          // Add to cart hover
          const addToCartBtn = document.querySelector('.add-to-cart-button');
          if (addToCartBtn) {
            addToCartBtn.addEventListener('mouseenter', () => signals.addToCartHover = true);
          }

          // Price view duration
          const priceElement = document.querySelector('.product-price');
          if (priceElement) {
            let priceViewStart;
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  priceViewStart = Date.now();
                } else if (priceViewStart) {
                  signals.priceViewDuration += Math.floor((Date.now() - priceViewStart) / 1000);
                  priceViewStart = null;
                }
              });
            });
            observer.observe(priceElement);
          }
        };

        // Poll server with signals
        const pollServer = async () => {
          try {
            const response = await fetch(\`/api/public/pdp/poll/\${config.merchantId}\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                visitorId,
                sessionId,
                product: getProductDetails(),
                behavioralSignals: signals,
                deviceInfo: getDeviceInfo()
              })
            });

            const data = await response.json();
            if (data.success && data.data.widget) {
              renderWidget(data.data.widget);
            }
          } catch (error) {
            console.error('Error polling server:', error);
          }
        };

        // Render widget
        const renderWidget = (widget) => {
          const container = document.querySelector(\`[data-widget-placement="\${config.placement}"]\`);
          if (!container) return;

          const widgetHtml = \`
            <div class="kwik-widget \${widget.type}-widget" style="
              background-color: \${widget.styling.colors.background};
              color: \${widget.styling.colors.text};
              font-family: \${config.styles.fonts.family};
              font-size: \${config.styles.fonts.size};
              padding: 1rem;
              border-radius: 0.5rem;
              margin: 1rem 0;
            ">
              <h4 style="
                color: \${widget.styling.colors.accent};
                margin: 0 0 0.5rem;
              ">\${widget.content.title}</h4>
              <p style="margin: 0 0 0.5rem;">\${widget.content.message}</p>
              <small style="
                color: \${widget.styling.colors.accent};
                font-style: italic;
              ">\${widget.content.additionalText}</small>
              \${widget.settings.showCountdown ? \`
                <div class="countdown" data-duration="\${widget.settings.countdownDuration}">
                  <!-- Countdown implementation -->
                </div>
              \` : ''}
            </div>
          \`;

          container.innerHTML = widgetHtml;
        };

        // Initialize tracking
        trackSignals();
        pollServer();
        pollInterval = setInterval(pollServer, POLL_FREQUENCY);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
          clearInterval(pollInterval);
        });
      })();
    `;

    res.set("Content-Type", "application/javascript");
    res.send(script);
  } catch (error) {
    next(error);
  }
};

// @desc    Get analytics overview
// @route   GET /api/pdp/analytics/overview
// @access  Private
exports.getAnalyticsOverview = async (req, res, next) => {
  try {
    const detections = await Detection.find({ merchant: req.user.merchant });

    const overview = {
      totalDetections: detections.length,
      intentDistribution: {
        highIntent: detections.filter((d) => d.intentType === "high-intent")
          .length,
        priceSensitive: detections.filter(
          (d) => d.intentType === "price-sensitive"
        ).length,
        justBrowsing: detections.filter((d) => d.intentType === "just-browsing")
          .length,
      },
      averageIntentScore:
        detections.reduce((acc, curr) => acc + curr.intentScore, 0) /
          detections.length || 0,
      widgetImpressions: detections.filter((d) => d.widgetShown).length,
      conversionRate:
        (detections.filter((d) => d.converted).length / detections.length) *
          100 || 0,
    };

    res.status(200).json({
      success: true,
      data: overview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get intent distribution
// @route   GET /api/pdp/analytics/intent-distribution
// @access  Private
exports.getIntentDistribution = async (req, res, next) => {
  try {
    const distribution = await Detection.aggregate([
      { $match: { merchant: req.user.merchant } },
      {
        $group: {
          _id: "$intentType",
          count: { $sum: 1 },
          averageScore: { $avg: "$intentScore" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: distribution,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get conversion rates
// @route   GET /api/pdp/analytics/conversion-rates
// @access  Private
exports.getConversionRates = async (req, res, next) => {
  try {
    const detections = await Detection.find({ merchant: req.user.merchant });

    const rates = {
      overall: {
        total: detections.length,
        converted: detections.filter((d) => d.converted).length,
        rate:
          (detections.filter((d) => d.converted).length / detections.length) *
            100 || 0,
      },
      byIntent: {
        highIntent: {
          total: detections.filter((d) => d.intentType === "high-intent")
            .length,
          converted: detections.filter(
            (d) => d.intentType === "high-intent" && d.converted
          ).length,
          rate:
            (detections.filter(
              (d) => d.intentType === "high-intent" && d.converted
            ).length /
              detections.filter((d) => d.intentType === "high-intent").length) *
              100 || 0,
        },
        priceSensitive: {
          total: detections.filter((d) => d.intentType === "price-sensitive")
            .length,
          converted: detections.filter(
            (d) => d.intentType === "price-sensitive" && d.converted
          ).length,
          rate:
            (detections.filter(
              (d) => d.intentType === "price-sensitive" && d.converted
            ).length /
              detections.filter((d) => d.intentType === "price-sensitive")
                .length) *
              100 || 0,
        },
        justBrowsing: {
          total: detections.filter((d) => d.intentType === "just-browsing")
            .length,
          converted: detections.filter(
            (d) => d.intentType === "just-browsing" && d.converted
          ).length,
          rate:
            (detections.filter(
              (d) => d.intentType === "just-browsing" && d.converted
            ).length /
              detections.filter((d) => d.intentType === "just-browsing")
                .length) *
              100 || 0,
        },
      },
    };

    res.status(200).json({
      success: true,
      data: rates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get widget performance
// @route   GET /api/pdp/analytics/widget-performance
// @access  Private
exports.getWidgetPerformance = async (req, res, next) => {
  try {
    const widgets = await Widget.find({ merchant: req.user.merchant });

    const performance = await Promise.all(
      widgets.map(async (widget) => {
        const detections = await Detection.find({
          merchant: req.user.merchant,
          widgetShown: widget._id,
        });

        return {
          widgetId: widget._id,
          name: widget.name,
          type: widget.widgetType,
          impressions: widget.impressions,
          interactions: widget.interactions,
          conversions: widget.conversions,
          interactionRate:
            (widget.interactions / widget.impressions) * 100 || 0,
          conversionRate: (widget.conversions / widget.impressions) * 100 || 0,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export analytics data
// @route   GET /api/pdp/export/analytics
// @access  Private
exports.exportAnalytics = async (req, res, next) => {
  try {
    const detections = await Detection.find({ merchant: req.user.merchant })
      .populate("widgetShown", "name widgetType")
      .select("-__v");

    const analytics = {
      detections: detections.map((d) => ({
        sessionId: d.sessionId,
        visitorId: d.visitorId,
        intentType: d.intentType,
        intentScore: d.intentScore,
        widget: d.widgetShown
          ? {
              name: d.widgetShown.name,
              type: d.widgetShown.widgetType,
            }
          : null,
        converted: d.converted,
        timestamp: d.timestamp,
      })),
      summary: {
        totalDetections: detections.length,
        intentDistribution: {
          highIntent: detections.filter((d) => d.intentType === "high-intent")
            .length,
          priceSensitive: detections.filter(
            (d) => d.intentType === "price-sensitive"
          ).length,
          justBrowsing: detections.filter(
            (d) => d.intentType === "just-browsing"
          ).length,
        },
        conversionRate:
          (detections.filter((d) => d.converted).length / detections.length) *
            100 || 0,
      },
    };

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export detections data
// @route   GET /api/pdp/export/detections
// @access  Private
exports.exportDetections = async (req, res, next) => {
  try {
    const detections = await Detection.find({ merchant: req.user.id })
      .populate("widgetShown", "name widgetType")
      .select("-__v");

    res.status(200).json({
      success: true,
      data: detections,
    });
  } catch (error) {
    next(error);
  }
};
