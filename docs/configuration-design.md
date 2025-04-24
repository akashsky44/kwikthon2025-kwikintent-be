# Configuration System Design

## Models

### Configuration Model

```javascript
{
  userId: ObjectId,
  intentTypes: {
    highIntent: {
      threshold: Number,
      behavioralSignals: [{
        name: String,
        description: String,
        enabled: Boolean,
        weight: Number,
        threshold: Number
      }],
      historicalFactors: [{
        name: String,
        description: String,
        enabled: Boolean,
        weight: Number
      }],
      deviceContext: [{
        name: String,
        description: String,
        enabled: Boolean,
        weight: Number
      }],
      customRules: [{
        name: String,
        description: String,
        condition: String,
        enabled: Boolean,
        weight: Number
      }]
    },
    priceSensitive: {
      // Similar structure as highIntent
    },
    comparisonShopper: {
      // Similar structure
    },
    cartAbandoner: {
      // Similar structure
    },
    returningVisitor: {
      // Similar structure
    },
    justBrowsing: {
      // Similar structure
    }
  },
  checkoutFactors: {
    paymentMethods: [{
      name: String,
      enabled: Boolean,
      weight: Number
    }],
    shippingOptions: [{
      name: String,
      enabled: Boolean,
      weight: Number
    }],
    discountRules: [{
      name: String,
      condition: String,
      enabled: Boolean,
      value: Number
    }]
  },
  widgetSettings: {
    highIntent: {
      type: String,
      content: {
        title: String,
        message: String,
        additionalText: String
      },
      styling: {
        position: String,
        colors: {
          background: String,
          text: String,
          accent: String
        }
      },
      settings: Object
    },
    priceSensitive: {
      // Similar structure
    },
    // Other intent types...
  },
  advancedSettings: {
    pollingInterval: Number,
    sessionTimeout: Number,
    detectionThresholds: {
      timeOnPage: Number,
      scrollDepth: Number,
      interactionCount: Number
    }
  }
}
```

## API Endpoints

### Configuration Management

```
GET /api/configuration
- Get current configuration

POST /api/configuration
- Create/Update configuration

GET /api/configuration/defaults
- Get default configuration templates

POST /api/configuration/test
- Test configuration with sample data
```

### Intent Rules

```
GET /api/configuration/intent-rules
- Get all intent rules

POST /api/configuration/intent-rules
- Create/Update intent rules

GET /api/configuration/intent-rules/:type
- Get specific intent rule configuration

PUT /api/configuration/intent-rules/:type
- Update specific intent rule

DELETE /api/configuration/intent-rules/:type
- Delete specific intent rule
```

### Widget Settings

```
GET /api/configuration/widgets
- Get all widget configurations

POST /api/configuration/widgets
- Create/Update widget configurations

GET /api/configuration/widgets/:intentType
- Get widget configuration for specific intent type

PUT /api/configuration/widgets/:intentType
- Update widget configuration for intent type
```

### Checkout Factors

```
GET /api/configuration/checkout
- Get checkout configuration

POST /api/configuration/checkout
- Update checkout configuration

GET /api/configuration/checkout/factors
- Get checkout factors

PUT /api/configuration/checkout/factors
- Update checkout factors
```

## Sample Configuration Data

### High Intent Configuration

```javascript
{
  threshold: 70,
  behavioralSignals: [
    {
      name: "timeOnPage",
      description: "User spends significant time on product page",
      enabled: true,
      weight: 3,
      threshold: 120
    },
    {
      name: "scrollDepth",
      description: "User scrolls to product details and reviews",
      enabled: true,
      weight: 2,
      threshold: 80
    },
    // ... other signals
  ],
  historicalFactors: [
    {
      name: "previousPurchaseHistory",
      description: "User has purchased similar items before",
      enabled: true,
      weight: 3
    }
    // ... other factors
  ]
}
```

### Price Sensitive Configuration

```javascript
{
  threshold: 50,
  behavioralSignals: [
    {
      name: "priceCheckFrequency",
      description: "User checks price multiple times",
      enabled: true,
      weight: 3,
      threshold: 2
    },
    {
      name: "couponSearch",
      description: "User searches for coupons",
      enabled: true,
      weight: 3,
      threshold: 1
    }
    // ... other signals
  ]
}
```

Would you like me to switch to Code mode to implement these models and APIs?
