// KwikIntent Shopify Integration Script
(function() {
  // Configuration
  const KWIKINTENT_API = 'http://localhost:3000/api'; // Replace with your API URL
  const MERCHANT_ID = 'YOUR_MERCHANT_ID'; // Replace with your merchant ID
  const POLL_INTERVAL = 30000; // Poll every 30 seconds

  // State management
  let visitorId = localStorage.getItem('kwikintent_visitor_id') || 'v_' + Math.random().toString(36).substring(2);
  let sessionId = 's_' + Math.random().toString(36).substring(2);
  let signals = {
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

  // Store visitor ID
  localStorage.setItem('kwikintent_visitor_id', visitorId);

  // Helper functions
  function getProductInfo() {
    const productJson = document.querySelector('[data-product-json]');
    if (!productJson) return null;

    const product = JSON.parse(productJson.textContent);
    return {
      id: product.id.toString(),
      name: product.title,
      url: window.location.pathname,
      price: parseFloat(product.price / 100), // Convert cents to dollars
      currency: window.Shopify?.currency?.active || 'USD'
    };
  }

  function getDeviceInfo() {
    return {
      type: /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? 'mobile' : 'desktop',
      userAgent: navigator.userAgent,
      screenSize: `${window.innerWidth}x${window.innerHeight}`
    };
  }

  // Track user behavior
  function initTracking() {
    // Time on page
    setInterval(() => {
      signals.timeOnPage += 1;
    }, 1000);

    // Scroll depth
    let maxScroll = 0;
    document.addEventListener('scroll', () => {
      const percent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      maxScroll = Math.max(maxScroll, Math.round(percent));
      signals.scrollDepth = maxScroll;
    });

    // Product images
    document.querySelectorAll('.product__media-item').forEach(img => {
      img.addEventListener('click', () => {
        signals.imageViews++;
        signals.productInteraction = true;
      });
    });

    // Add to cart hover
    const addToCartBtn = document.querySelector('[name="add"]');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('mouseenter', () => {
        signals.addToCartHover = true;
      });
    }

    // Price view duration
    const priceElement = document.querySelector('.price__regular');
    if (priceElement) {
      let priceViewStart = null;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            priceViewStart = Date.now();
          } else if (priceViewStart) {
            signals.priceViewDuration += Math.round((Date.now() - priceViewStart) / 1000);
            priceViewStart = null;
          }
        });
      });
      observer.observe(priceElement);
    }
  }

  // Create widget container
  function createWidgetContainer() {
    const container = document.createElement('div');
    container.id = 'kwikintent-widget';
    container.style.display = 'none';
    container.style.margin = '20px 0';
    container.style.padding = '15px';
    container.style.borderRadius = '8px';
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    // Insert after price
    const priceElement = document.querySelector('.price__regular');
    if (priceElement) {
      priceElement.parentNode.insertBefore(container, priceElement.nextSibling);
    }

    return container;
  }

  // Render widget
  function renderWidget(widget) {
    if (!widget) return;

    const container = document.getElementById('kwikintent-widget') || createWidgetContainer();
    const { content, styling, settings } = widget;

    container.style.backgroundColor = styling.colors.background;
    container.style.color = styling.colors.text;
    
    container.innerHTML = `
      <h4 style="margin: 0 0 10px 0; color: ${styling.colors.accent}">
        ${content.title}
      </h4>
      <p style="margin: 0 0 5px 0">
        ${content.message}
      </p>
      ${content.additionalText ? `
        <p style="margin: 5px 0 0 0; font-size: 0.9em; opacity: 0.8">
          ${content.additionalText}
        </p>
      ` : ''}
      ${settings.showCountdown ? `
        <div class="countdown" style="margin-top: 10px; font-weight: bold; color: ${styling.colors.accent}">
          <span class="countdown-value"></span>
        </div>
      ` : ''}
    `;

    container.style.display = 'block';

    // Initialize countdown if enabled
    if (settings.showCountdown) {
      let timeLeft = settings.countdownDuration;
      const countdownEl = container.querySelector('.countdown-value');
      
      const updateCountdown = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
          timeLeft--;
          setTimeout(updateCountdown, 1000);
        } else {
          container.style.display = 'none';
        }
      };

      updateCountdown();
    }

    // Track widget interactions
    container.addEventListener('click', () => {
      fetch(`${KWIKINTENT_API}/public/analytics/interaction/${widget.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          interactionType: 'click'
        })
      });
    });
  }

  // Poll for user intent
  async function pollUserIntent() {
    const product = getProductInfo();
    if (!product) return;

    try {
      const response = await fetch(`${KWIKINTENT_API}/public/pdp/poll/${MERCHANT_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          visitorId,
          sessionId,
          product,
          behavioralSignals: signals,
          deviceInfo: getDeviceInfo()
        })
      });

      const { data } = await response.json();
      if (data?.widget) {
        renderWidget(data.widget);
      }
    } catch (error) {
      console.error('KwikIntent Error:', error);
    }
  }

  // Track conversions
  window.trackKwikIntentConversion = function(type, value) {
    fetch(`${KWIKINTENT_API}/public/analytics/conversion/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversionType: type,
        conversionValue: value
      })
    });
  };

  // Initialize tracking
  initTracking();

  // Start polling
  pollUserIntent();
  const pollInterval = setInterval(pollUserIntent, POLL_INTERVAL);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(pollInterval);
  });
})();
</script>

<!-- Add this to your product template -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'YOUR_SERVER_URL/public/shopify-integration.js';
    script.async = true;
    document.head.appendChild(script);
  });
</script>