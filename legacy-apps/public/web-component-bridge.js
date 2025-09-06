/**
 * Web Component Communication Bridge
 * This script enables communication between legacy apps and the Web Component wrapper
 */

(function() {
  'use strict';
  
  // Configuration passed from parent
  let config = {
    userTier: 'free',
    locale: 'en',
    userId: null,
    apiUrl: 'http://localhost:3001'
  };
  
  // Listen for initialization message from parent
  window.addEventListener('message', function(event) {
    if (event.data.type === 'init') {
      config = { ...config, ...event.data.config };
      console.log('Web Component Bridge initialized:', config);
      
      // Apply configuration to the app
      applyConfiguration();
    }
  });
  
  // Apply configuration to the legacy app
  function applyConfiguration() {
    // Update any locale-specific elements
    if (config.locale !== 'en') {
      updateLocale(config.locale);
    }
    
    // Apply tier restrictions
    applyTierRestrictions(config.userTier);
    
    // Add watermark if free tier
    if (config.userTier === 'free') {
      addWatermarkToApp();
    }
  }
  
  // Update locale in the app
  function updateLocale(locale) {
    // This would need to be customized per app
    // For now, we'll just update the HTML lang attribute
    document.documentElement.lang = locale;
    
    // Send message to parent that locale was updated
    sendMessage('locale-updated', { locale });
  }
  
  // Apply tier-based restrictions
  function applyTierRestrictions(tier) {
    if (tier === 'free') {
      // Disable premium features
      const premiumElements = document.querySelectorAll('[data-premium="true"]');
      premiumElements.forEach(el => {
        el.style.display = 'none';
      });
      
      // Limit certain inputs
      const gridSizeSelect = document.getElementById('gridSize');
      if (gridSizeSelect) {
        // Remove options larger than 12x12 for free tier
        const options = gridSizeSelect.querySelectorAll('option');
        options.forEach(option => {
          if (parseInt(option.value) > 12) {
            option.remove();
          }
        });
      }
    }
  }
  
  // Add watermark overlay
  function addWatermarkToApp() {
    // Check if watermark already exists
    if (document.getElementById('wc-watermark')) return;
    
    const watermark = document.createElement('div');
    watermark.id = 'wc-watermark';
    watermark.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 48px;
      color: rgba(0, 0, 0, 0.1);
      z-index: 9999;
      pointer-events: none;
      font-weight: bold;
      white-space: nowrap;
      user-select: none;
    `;
    watermark.textContent = 'FREE VERSION - LessonCraftStudio.com';
    document.body.appendChild(watermark);
    
    // Also add to print styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
      @media print {
        #wc-watermark {
          display: block !important;
          position: fixed !important;
          color: rgba(0, 0, 0, 0.2) !important;
        }
      }
    `;
    document.head.appendChild(printStyle);
    
    // Override PDF download functions to add watermark
    interceptPDFDownloads();
  }
  
  // Intercept PDF downloads to add watermark
  function interceptPDFDownloads() {
    if (config.userTier !== 'free') return;
    
    // Wait for downloadPDF function to be defined
    const checkAndOverride = () => {
      if (typeof window.downloadPDF === 'function') {
        const originalDownloadPDF = window.downloadPDF;
        window.downloadPDF = async function(canvasToExport, fileName) {
          // Add watermark to canvas before PDF generation
          if (canvasToExport && canvasToExport.add) {
            // Create watermark text for fabric canvas
            const watermarkText = new fabric.Text('FREE VERSION - LessonCraftStudio.com', {
              fontSize: 40,
              fill: 'rgba(0, 0, 0, 0.15)',
              angle: -45,
              left: canvasToExport.width / 2,
              top: canvasToExport.height / 2,
              originX: 'center',
              originY: 'center',
              selectable: false,
              evented: false
            });
            
            // Add watermark to canvas
            canvasToExport.add(watermarkText);
            canvasToExport.renderAll();
            
            // Call original function
            const result = await originalDownloadPDF.call(this, canvasToExport, fileName);
            
            // Remove watermark after PDF generation (optional, to keep display clean)
            // canvasToExport.remove(watermarkText);
            // canvasToExport.renderAll();
            
            return result;
          }
          
          // If not a fabric canvas, call original
          return originalDownloadPDF.call(this, canvasToExport, fileName);
        };
      } else {
        // Try again in 500ms if function not yet defined
        setTimeout(checkAndOverride, 500);
      }
    };
    
    checkAndOverride();
  }
  
  // Send message to parent Web Component
  function sendMessage(type, payload) {
    window.parent.postMessage({
      type: type,
      payload: payload
    }, '*');
  }
  
  // Track worksheet generation
  window.trackWorksheetGeneration = function(data) {
    sendMessage('worksheet-generated', {
      ...data,
      timestamp: new Date().toISOString(),
      userTier: config.userTier,
      locale: config.locale
    });
    
    // Also track usage
    sendMessage('track-usage', {
      action: 'generate',
      appName: getAppName(),
      ...data
    });
  };
  
  // Handle download requests
  window.requestDownload = function(data) {
    sendMessage('download-request', {
      ...data,
      watermarked: config.userTier === 'free'
    });
  };
  
  // Handle print requests
  window.requestPrint = function() {
    sendMessage('print-request', {});
  };
  
  // Get app name from the page
  function getAppName() {
    // Extract from URL or page title
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop();
    return filename ? filename.replace('.html', '') : 'unknown';
  }
  
  // Override existing print function
  const originalPrint = window.print;
  window.print = function() {
    // Ensure watermark is visible for free tier
    if (config.userTier === 'free') {
      addWatermarkToApp();
    }
    
    // Track print action
    sendMessage('track-usage', {
      action: 'print',
      appName: getAppName()
    });
    
    // Call original print
    originalPrint.call(window);
  };
  
  // Intercept form submissions for worksheet generation
  document.addEventListener('submit', function(event) {
    const form = event.target;
    if (form.id === 'worksheetForm' || form.classList.contains('worksheet-form')) {
      // Track generation
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      trackWorksheetGeneration({
        formData: data,
        appName: getAppName()
      });
    }
  }, true);
  
  // API request interceptor for legacy apps
  window.makeApiRequest = async function(endpoint, options = {}) {
    const url = `${config.apiUrl}${endpoint}`;
    
    // Add authentication if user is logged in
    if (config.userId) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      };
    }
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Track API usage
      sendMessage('track-usage', {
        action: 'api-request',
        endpoint: endpoint,
        appName: getAppName()
      });
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      sendMessage('error', {
        message: 'API request failed',
        error: error.message
      });
      throw error;
    }
  };
  
  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      sendMessage('app-loaded', { appName: getAppName() });
    });
  } else {
    sendMessage('app-loaded', { appName: getAppName() });
  }
})();