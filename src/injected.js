(function() {
  'use strict';

  // Store original functions
  const originalFetch = window.fetch;
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  // Flag to track if we're currently patching
  let isPatching = false;

  // Monkey patch fetch
  function patchFetch() {
    if (window.fetch === monkeyPatchedFetch) return; // Already patched
    
    window.fetch = monkeyPatchedFetch;
  }

  function monkeyPatchedFetch(...args) {
    const [resource, config] = args;
    const url = typeof resource === 'string' ? resource : resource.url;

    console.log('URL:', url);

    return originalFetch.apply(this, args)
      .then(async response => {
        // Clone the response so we can read it
        const clonedResponse = response.clone();
        
        try {
          const contentType = response.headers.get('content-type');
          let responseData;
          
          if (contentType && contentType.includes('application/json')) {
            responseData = await clonedResponse.json();
          } else {
            responseData = await clonedResponse.text();
          }
          
          console.log('Response Data:', responseData);
        } catch (error) {
          // Silently handle errors reading response
        }

        return response;
      });
  }

  // Monkey patch XMLHttpRequest
  function patchXHR() {
    if (XMLHttpRequest.prototype.open === monkeyPatchedXHROpen) return; // Already patched
    
    XMLHttpRequest.prototype.open = monkeyPatchedXHROpen;
    XMLHttpRequest.prototype.send = monkeyPatchedXHRSend;
  }

  function monkeyPatchedXHROpen(method, url, ...rest) {
    this._method = method;
    this._url = url;
    console.log('URL:', url);
    return originalXHROpen.call(this, method, url, ...rest);
  }

  function monkeyPatchedXHRSend(body) {
    const xhr = this;
    
    // Add event listener for load
    xhr.addEventListener('load', function() {
      if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
        try {
          const contentType = xhr.getResponseHeader('content-type');
          let responseData;

          if (contentType && contentType.includes('application/json')) {
            responseData = JSON.parse(xhr.responseText);
          } else {
            responseData = xhr.responseText;
          }

          console.log('Response Data:', responseData);
        } catch (error) {
          // Silently handle errors processing response
        }
      }
    });

    return originalXHRSend.call(this, body);
  }

  // Apply patches
  function applyPatches() {
    if (isPatching) return;
    isPatching = true;
    
    patchFetch();
    patchXHR();
    
    isPatching = false;
  }

  // Monitor for patches being overwritten
  function monitorPatches() {
    setInterval(() => {
      // Check if fetch was overwritten
      if (window.fetch !== monkeyPatchedFetch) {
        patchFetch();
      }

      // Check if XHR was overwritten
      if (XMLHttpRequest.prototype.open !== monkeyPatchedXHROpen) {
        patchXHR();
      }
    }, 1000); // Check every second
  }

  // Initialize
  applyPatches();
  monitorPatches();

})();
