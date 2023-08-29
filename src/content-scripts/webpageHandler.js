import WebPageClient from "../services/webpage/client";

function startWebPageHandler() {
  const client = new WebPageClient();
  const pageText = client.getText();

  const prompt = `This is a webpage text content. Summarize the following but don't omit the details: ${pageText}`;

  chrome.runtime.sendMessage(
    {
      action: messages.NEW_PROMPT,
      prompt,
    },
    () => {
      window.open("https://chat.openai.com", "_blank");
    }
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === messages.SUMMARIZE_WEBPAGE_CONTENT) {
    startWebPageHandler();
  }
});
