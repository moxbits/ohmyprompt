import requests from "../utils/requests";

import ChatGPTClient from "../services/chatgpt/client";

async function startChatGPTHandler() {
  chrome.runtime.sendMessage(
    { action: requests.types.GET_PROMPT },
    async ({ prompt }) => {
      const client = new ChatGPTClient();
      await client.sendMessage(prompt);
    },
  );
}

window.onload = startChatGPTHandler;