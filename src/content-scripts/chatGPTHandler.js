import { Messages, Prompt } from "../utils/types";

import ChatGPTClient from "../services/chatgpt/client";

async function startChatGPTHandler() {
  chrome.runtime.sendMessage({ message: Messages.GET_PROMPT }, (response) => {
    const client = new ChatGPTClient();
    client.sendMessage(response.message);
  });
}

window.onload = startChatGPTHandler;
