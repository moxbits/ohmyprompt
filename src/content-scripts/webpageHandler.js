import WebPageClient from "../services/webpage/client";

import { messages } from "../utils/types";

function startWebPageHandler() {
  const client = new WebPageClient();
  const pageText = client.getPageAsText();

  const prompt = {
    content: pageText,
    endMessage:
      "Summarize the provided webpage content that i gave you but don't remove the important parts and details",
  };

  chrome.runtime.sendMessage(
    {
      action: messages.NEW_PROMPT,
      prompt,
    },
    () => {
      window.open("https://chat.openai.com", "_blank");
    },
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === messages.SUMMARIZE_WEBPAGE_CONTENT) {
    startWebPageHandler();
  }
});
