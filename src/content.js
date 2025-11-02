// Content script to inject the monkey patch into the page context
(function() {
  'use strict';

  // Inject the script into the page context
  function injectScript() {
    try {
      // Check if chrome.runtime is available
      if (!chrome.runtime || !chrome.runtime.getURL) {
        return;
      }

      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('injected.js');
      script.onload = function() {
        this.remove();
      };
      script.onerror = function() {
        this.remove();
      };

      // Inject as early as possible
      (document.head || document.documentElement).appendChild(script);
    } catch (error) {
      // Extension context invalidated - silently handle
    }
  }

  // Inject the script immediately
  injectScript();

})();
