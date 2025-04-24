# KwikIntent API Design

## Public Shopify Integration API

### 1. Widget Code Block API

```
GET /api/public/widget-code/:merchantId
```

Returns the JavaScript code block that should be embedded in the merchant's Shopify store. This code:

- Initializes the KwikIntent tracking system
- Sets up event listeners for user behavior
- Handles widget rendering based on intent

#### Response

```javascript
{
  "success": true,
  "data": {
    "code": "// KwikIntent initialization code",
    "version": "1.0.0",
    "config": {
      "pollInterval": 5000,
      "trackingEvents": ["scroll", "click", "hover"]
    }
  }
}
```

### 2. User Behavior Polling API

```
POST /api/public/pdp/poll/:merchantId
```

Receives user behavior data from the Shopify store and returns appropriate widget content.

#### Request Body

```javascript
{
  "visitorId": "string",
  "sessionId": "string",
  "product": {
    "id": "string",
    "url": "string",
    "price": "number",
    "currency": "string"
  },
  "behavioralSignals": {
    "timeOnPage": "number",
    "scrollDepth": "number",
    "imageViews": "number",
    "addToCartHover": "boolean",
    "priceCheckCount": "number",
    "couponSearch": "boolean"
  },
  "deviceInfo": {
    "type": "string",
    "userAgent": "string",
    "screenSize": "string"
  },
  "location": {
    "country": "string",
    "region": "string",
    "city": "string"
  }
}
```

#### Response

```javascript
{
  "success": true,
  "data": {
    "detectionId": "string",
    "intentType": "string",
    "confidenceScore": "number",
    "widget": {
      "id": "string",
      "type": "string",
      "content": {
        "title": "string",
        "message": "string",
        "additionalText": "string"
      },
      "styling": {
        "position": "string",
        "colors": {
          "background": "string",
          "text": "string",
          "accent": "string"
        }
      }
    }
  }
}
```

## Shopify Integration Flow

1. Merchant Setup:

   - Merchant registers on KwikIntent platform
   - Gets merchantId and API credentials
   - Adds widget code block to Shopify theme

2. Widget Code Implementation:

   ```javascript
   // Initialize KwikIntent
   window.KwikIntent = {
     merchantId: "merchant_123",
     state: {
       visitorId: generateVisitorId(),
       sessionId: generateSessionId(),
       signals: {
         timeOnPage: 0,
         scrollDepth: 0,
         imageViews: 0,
       },
     },

     init() {
       this.setupTracking();
       this.startPolling();
     },

     setupTracking() {
       // Track scroll depth
       document.addEventListener("scroll", () => {
         const docHeight = document.documentElement.scrollHeight;
         const scrollPos = window.scrollY + window.innerHeight;
         this.state.signals.scrollDepth = Math.round(
           (scrollPos / docHeight) * 100
         );
       });

       // Track image views
       document.querySelectorAll(".product-image").forEach((img) => {
         img.addEventListener("click", () => {
           this.state.signals.imageViews++;
         });
       });

       // Track add to cart hover
       document
         .querySelector(".add-to-cart")
         .addEventListener("mouseenter", () => {
           this.state.signals.addToCartHover = true;
         });
     },

     async pollServer() {
       const response = await fetch("/api/public/pdp/poll/" + this.merchantId, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           visitorId: this.state.visitorId,
           sessionId: this.state.sessionId,
           product: this.getProductInfo(),
           behavioralSignals: this.state.signals,
           deviceInfo: this.getDeviceInfo(),
           location: await this.getLocation(),
         }),
       });

       const result = await response.json();
       if (result.success) {
         this.renderWidget(result.data.widget);
       }
     },

     renderWidget(widget) {
       // Remove existing widget if any
       const existing = document.querySelector(".kwikintent-widget");
       if (existing) existing.remove();

       // Create new widget
       const container = document.createElement("div");
       container.className = "kwikintent-widget";
       container.innerHTML = `
         <div class="widget-content" style="
           background-color: ${widget.styling.colors.background};
           color: ${widget.styling.colors.text};
           border: 1px solid ${widget.styling.colors.accent};
           padding: 16px;
           border-radius: 8px;
           margin: 16px 0;
         ">
           <h3 style="margin: 0 0 8px 0; color: ${widget.styling.colors.accent};">
             ${widget.content.title}
           </h3>
           <p style="margin: 0;">${widget.content.message}</p>
           <small style="display: block; margin-top: 8px;">
             ${widget.content.additionalText}
           </small>
         </div>
       `;

       // Insert widget at specified position
       const position = widget.styling.position;
       const target = document.querySelector(
         position === "below-price"
           ? ".product-price"
           : position === "above-add-to-cart"
           ? ".add-to-cart"
           : ".product-description"
       );
       target.parentNode.insertBefore(
         container,
         position.startsWith("above") ? target : target.nextSibling
       );
     },
   };

   // Initialize when DOM is ready
   document.addEventListener("DOMContentLoaded", () => {
     window.KwikIntent.init();
   });
   ```

3. Real-time Intent Detection:

   - Widget code continuously tracks user behavior
   - Polls backend every 5 seconds with behavioral data
   - Backend processes signals and returns appropriate widget
   - Widget is dynamically rendered in the specified position

4. Performance Tracking:
   - Impressions tracked when widget is rendered
   - Clicks tracked on widget interaction
   - Conversions tracked on successful purchase
   - Data available in merchant dashboard

Would you like me to switch to Code mode to implement these public endpoints and the widget code generation system?
