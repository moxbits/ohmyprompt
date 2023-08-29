import { messages } from "../utils/types";

import ChatGPTClient from "../services/chatgpt/client";

async function startChatGPTHandler() {
  chrome.runtime.sendMessage(
    { action: messages.GET_PROMPT },
    async (response) => {
      const client = new ChatGPTClient();
      await client.sendMessage(response.prompt);
    }
  );
}

window.onload = startChatGPTHandler;
