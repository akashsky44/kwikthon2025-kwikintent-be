// KwikIntent Widget Script
(function() {
  const config = {{WIDGET_CONFIG}};
  const API_URL = '{{API_URL}}';
  const MERCHANT_ID = '{{MERCHANT_ID}}';

  let visitorId = localStorage.getItem('kwikintent_visitor_id') || 
    'v_' + Math.random().toString(36).substring(2, 15);
  let sessionId = 's_' + Math.random().toString(36).substring(2, 15);
  let pollInterval;
  let widgetContainer;

  // Store visitor ID
  localStorage.setItem('kwikintent_visitor_id', visitorId);

  // Initialize behavioral signals
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

  // Track time on page
  setInterval(() => {
    signals.timeOnPage += 1;
  }, 1000);

  // Track scroll depth
  let maxScroll = 0;
  document.addEventListener('scroll', () => {
    const percent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    maxScroll = Math.max(maxScroll, Math.round(percent));
    signals.scrollDepth = maxScroll;
  });

  // Track image views
  document.querySelectorAll('.product-image').forEach(img => {
    img.addEventListener('click', () => signals.imageViews++);
  });

  // Track add to cart hover
  const addToCartBtn = document.querySelector('.add-to-cart-button');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('mouseenter', () => {
      signals.addToCartHover = true;
    });
  }

  // Track price view duration
  const priceElement = document.querySelector('.product-price');
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

  // Track product interactions
  document.querySelector('.product-container').addEventListener('click', () => {
    signals.productInteraction = true;
  });

  // Get device info
  const deviceInfo = {
    type: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(navigator.userAgent) 
      ? 'mobile' : 'desktop',
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`
  };

  // Get product info
  const getProductInfo = () => {
    const container = document.querySelector('.product-container');
    return {
      id: container.dataset.productId,
      name: container.dataset.productName,
      url: window.location.pathname,
      price: parseFloat(container.dataset.productPrice),
      currency: container.dataset.currency
    };
  };

  // Create widget container
  const createWidgetContainer = () => {
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'kwikintent-widget';
    widgetContainer.style.display = 'none';
    document.querySelector('.product-container').appendChild(widgetContainer);
  };

  // Render widget
  const renderWidget = (widget) => {
    if (!widget) return;

    const { content, styling, settings } = widget;
    
    widgetContainer.innerHTML = `
      <div class="widget-content" style="
        background-color: ${styling.colors.background};
        color: ${styling.colors.text};
        padding: 15px;
        border-radius: 8px;
        margin: 10px 0;
        font-family: ${config.widgetStyles.fonts.family};
        font-size: ${config.widgetStyles.fonts.size};
      ">
        <h4 style="
          margin: 0 0 10px 0;
          color: ${styling.colors.accent};
        ">${content.title}</h4>
        <p style="margin: 0 0 5px 0;">${content.message}</p>
        ${content.additionalText ? `
          <p style="
            margin: 5px 0 0 0;
            font-size: 0.9em;
            opacity: 0.8;
          ">${content.additionalText}</p>
        ` : ''}
        ${settings.showCountdown ? `
          <div class="countdown" style="
            margin-top: 10px;
            font-weight: bold;
            color: ${styling.colors.accent};
          ">
            <span class="countdown-value"></span>
          </div>
        ` : ''}
      </div>
    `;

    widgetContainer.style.display = 'block';

    // Initialize countdown if enabled
    if (settings.showCountdown) {
      let timeLeft = settings.countdownDuration;
      const countdownEl = widgetContainer.querySelector('.countdown-value');
      
      const updateCountdown = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
          timeLeft--;
          setTimeout(updateCountdown, 1000);
        } else {
          widgetContainer.style.display = 'none';
        }
      };

      updateCountdown();
    }

    // Track widget interactions
    widgetContainer.addEventListener('click', () => {
      fetch(`${API_URL}/public/analytics/interaction/${widget.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          interactionType: 'click'
        })
      });
    });
  };

  // Poll for user intent
  const pollUserIntent = async () => {
    try {
      const response = await fetch(`${API_URL}/public/pdp/poll/${MERCHANT_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          sessionId,
          product: getProductInfo(),
          behavioralSignals: signals,
          deviceInfo
        })
      });

      const { data } = await response.json();
      if (data && data.widget) {
        renderWidget(data.widget);
      }
    } catch (error) {
      console.error('Error polling user intent:', error);
    }
  };

  // Track conversion
  window.trackKwikIntentConversion = (type, value) => {
    fetch(`${API_URL}/public/analytics/conversion/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversionType: type,
        conversionValue: value
      })
    });
  };

  // Initialize
  createWidgetContainer();
  pollUserIntent();
  pollInterval = setInterval(pollUserIntent, 30000);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(pollInterval);
  });
})();