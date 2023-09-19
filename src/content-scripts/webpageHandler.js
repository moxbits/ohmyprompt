import WebPageClient from "../services/webpage/client";

import requests from "../utils/requests";

function startWebPageHandler() {
  const client = new WebPageClient();
  const pageTitle = client.getPageTitle();
  const pageText = client.getPageAsText();

  const prompt = {
    title: `I want to provide you with content of a webpage.\nWebpage title: ${pageTitle}`,
    content: pageText,
    ending: "Summarize the provided webpage content that i gave you",
    tokenLimit: 15000,
  };

  requests.sendPromptToChatGPT(prompt);
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
