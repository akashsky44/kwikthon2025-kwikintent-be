const defaultCheckoutFactors = [
  {
    factorType: "payment-friction",
    name: "Payment Friction",
    description: "Factors affecting payment completion",
    impact: 75,
    enabled: true,
    intentStrategies: [
      {
        intentType: "high-intent",
        enabled: true,
        strategy: "prepaid-incentives",
      },
      {
        intentType: "price-sensitive",
        enabled: true,
        strategy: "payment-discounts",
      },
      {
        intentType: "cart-abandoner",
        enabled: true,
        strategy: "simplified-checkout",
      },
    ],
    strategies: {
      prepaidIncentives: {
        name: "Prepaid Payment Incentives",
        description: "Offer incentives for prepaid payments",
        enabled: true,
        value: "5% discount on prepaid orders",
      },
      expressCheckout: {
        name: "Express Checkout",
        description: "Streamlined checkout process",
        enabled: true,
        value: "One-click checkout enabled",
      },
      paymentDiscounts: {
        name: "Payment Method Discounts",
        description: "Discounts for specific payment methods",
        enabled: true,
        value: "Extra 2% off on UPI payments",
      },
      simplifiedCheckout: {
        name: "Simplified Checkout",
        description: "Reduced form fields and steps",
        enabled: true,
        value: "Guest checkout enabled",
      },
    },
  },
  {
    factorType: "shipping-concerns",
    name: "Shipping & Delivery",
    description: "Factors affecting shipping decisions",
    impact: 80,
    enabled: true,
    intentStrategies: [
      {
        intentType: "high-intent",
        enabled: true,
        strategy: "express-delivery",
      },
      {
        intentType: "price-sensitive",
        enabled: true,
        strategy: "free-shipping",
      },
    ],
    strategies: {
      expressDelivery: {
        name: "Express Delivery",
        description: "Fast delivery options",
        enabled: true,
        value: "Same day delivery available",
      },
      freeShipping: {
        name: "Free Shipping",
        description: "Free shipping above threshold",
        enabled: true,
        value: "Free shipping above ₹499",
      },
      shippingDiscount: {
        name: "Shipping Discount",
        description: "Discounted shipping rates",
        enabled: true,
        value: "50% off on shipping",
      },
    },
  },
  {
    factorType: "trust-concerns",
    name: "Trust & Security",
    description: "Factors affecting trust and security",
    impact: 85,
    enabled: true,
    intentStrategies: [
      {
        intentType: "first-time-visitor",
        enabled: true,
        strategy: "trust-badges",
      },
      {
        intentType: "price-sensitive",
        enabled: true,
        strategy: "money-back",
      },
    ],
    strategies: {
      trustBadges: {
        name: "Trust Badges",
        description: "Display security certifications",
        enabled: true,
        value: "SSL & Payment Security badges",
      },
      moneyBack: {
        name: "Money Back Guarantee",
        description: "Money back guarantee policy",
        enabled: true,
        value: "30-day money back guarantee",
      },
      securePayment: {
        name: "Secure Payment",
        description: "Secure payment messaging",
        enabled: true,
        value: "256-bit encryption",
      },
    },
  },
  {
    factorType: "price-sensitivity",
    name: "Device-Optimized Pricing",
    description: "Price optimization based on device context",
    impact: 70,
    enabled: true,
    intentStrategies: [
      {
        intentType: "price-sensitive",
        enabled: true,
        strategy: "mobile-discount",
      },
      {
        intentType: "high-intent",
        enabled: true,
        strategy: "premium-experience",
      },
    ],
    strategies: {
      mobileDiscount: {
        name: "Mobile Discount",
        description: "Special pricing for mobile users",
        enabled: true,
        value: "Extra 5% off on mobile app",
      },
      premiumExperience: {
        name: "Premium Experience",
        description: "Enhanced shopping experience",
        enabled: true,
        value: "Priority customer support",
      },
    },
  },
];

module.exports = defaultCheckoutFactors;
