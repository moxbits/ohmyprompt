import WebPageClient from "../services/webpage/client";

import requests from "../utils/requests";

function startWebPageHandler() {
  const client = new WebPageClient();
  const pageTitle = client.getPageTitle();
  const pageText = client.getPageAsText();

  chrome.storage.sync.get("webpagePrompt", ({ webpagePrompt }) => {
    const prompt = {
      title: `I want to provide you with content of a webpage.\nWebpage title: ${pageTitle}`,
      content: pageText,
      ending: webpagePrompt,
      tokenLimit: 10000,
    };

    requests.sendPromptToChatGPT(prompt);
  });
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case requests.types.GET_WEBPAGE_CONTENT:
      startWebPageHandler();
      break;

    case requests.types.GET_SITE_TYPE:
      sendResponse({ type: "webpage" });
      break;

    default:
      console.error("ohmychat webpage: no such option is valid");
  }
});
