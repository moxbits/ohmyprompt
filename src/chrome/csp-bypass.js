import Tabs from "./tabs";

export function bypassCSP() {
  Tabs.getCurrentTab().then(({ id, url }) => {
    const addRules = [];

    addRules.push({
      id,
      action: {
        type: "modifyHeaders",
        responseHeaders: [
          {
            header: "content-security-policy",
            operation: "set",
            value: "",
          },
        ],
      },
      condition: { urlFilter: url, resourceTypes: ["main_frame", "sub_frame"] },
    });

    chrome.declarativeNetRequest.updateSessionRules({
      addRules,
    });
  });
}

export function disableCSPBypass() {
  Tabs.getCurrentTab().then(async ({ url }) => {
    const removeRuleIds = [];

    let rules = await chrome.declarativeNetRequest.getSessionRules();

    rules.forEach((rule) => {
      if (rule.condition.urlFilter === url) {
        removeRuleIds.push(rule.id);
      }
    });

    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds,
    });
  });
}

// function modifyRequestHeaders(details) {
//   var headerName = "Content-Security-Policy";
//   var headerValue = "default-src 'self'";
//
//   for (var i = 0; i < details.responseHeaders.length; ++i) {
//     if (details.responseHeaders[i].name.toLowerCase() == headerName) {
//       details.responseHeaders[i].value = headerValue;
//       break;
//     }
//   }
//
//   return { responseHeaders: details.responseHeaders };
// }
//
// export function bypassCSP(activeTab) {
//   const tabId = activeTab.id;
//   chrome.webRequest.onHeadersReceived.addListener(
//     modifyRequestHeaders,
//     { urls: ["*://*.x.com/*", "*://*.twitter.com/*"], tabId },
//     ["blocking", "responseHeaders"],
//   );
// }
//
// export function disableCSPBypass() {
//   chrome.webRequest.onHeadersReceived.removeListener(modifyRequestHeaders);
// }
