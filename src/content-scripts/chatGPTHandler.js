import requests from "../utils/requests";

import ChatGPTClient from "../services/chatgpt/client";

async function startChatGPTHandler() {
  chrome.runtime.sendMessage(
    { action: requests.types.GET_PROMPT },
    ({ prompt }) => {
      chrome.storage.sync.get("engine", async ({ engine }) => {
        const client = new ChatGPTClient();
        switch (engine) {
          case "chatgpt":
            await client.sendMessage(prompt);
            break;
          case "chatgpt-split":
            await client.sendMessageWithSplit(prompt);
            break;
        }
      });
    }
  );
}

window.onload = startChatGPTHandler;
