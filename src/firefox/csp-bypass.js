import Tabs from "./tabs";

function modifyRequestHeaders(details) {
  var headerName = "Content-Security-Policy";
  var headerValue = "default-src 'self'";

  for (var i = 0; i < details.responseHeaders.length; ++i) {
    if (details.responseHeaders[i].name.toLowerCase() == headerName) {
      details.responseHeaders[i].value = headerValue;
      break;
    }
  }

  return { responseHeaders: details.responseHeaders };
}

export async function bypassCSP() {
  const tab = await Tabs.getCurrentTab();
  const tabId = tab.id;
  browser.webRequest.onHeadersReceived.addListener(
    modifyRequestHeaders,
    { urls: ["*://*.x.com/*", "*://*.twitter.com/*"], tabId },
    ["blocking", "responseHeaders"],
  );
}

export function disableCSPBypass() {
  browser.webRequest.onHeadersReceived.removeListener(modifyRequestHeaders);
}
