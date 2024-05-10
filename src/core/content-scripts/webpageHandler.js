import Messages from "../browser-messages";
import Storage from "../browser-storage";

import WebPageClient from "../services/webpage/client";
import { types } from "../utils/types";

function startWebPageHandler() {
  const client = new WebPageClient();
  const pageTitle = client.getPageTitle();
  const pageText = client.getPageAsText();

  Storage.get("webpagePrompt", (data) => {
    const prompt = {
      title: `I want to provide you with content of a webpage.\nWebpage title: ${pageTitle}`,
      content: pageText,
      ending: data.webpagePrompt,
      tokenLimit: 10000,
    };

    Messages.sendPromptToLLM(prompt);
  });
}

Messages.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case types.GET_WEBPAGE_CONTENT:
      startWebPageHandler();
      break;

    case types.GET_SITE_TYPE:
      sendResponse({ type: "webpage" });
      break;
  }
});
