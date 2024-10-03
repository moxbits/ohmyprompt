browser.webRequest.onHeadersReceived.addListener(
  function (details) {
    var headerName = "Content-Security-Policy";
    var headerValue = "default-src 'self'";
    for (var i = 0; i < details.responseHeaders.length; ++i) {
      if (details.responseHeaders[i].name.toLowerCase() == headerName) {
        details.responseHeaders[i].value = headerValue;
        break;
      }
    }
    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["*://*.example.com/*"] },
  ["blocking", "responseHeaders"],
);

