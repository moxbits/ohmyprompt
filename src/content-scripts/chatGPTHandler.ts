import { BackgroundCalls, Prompt } from "../utils/types";

import ChatGPTClient from "../services/chatgpt/client";


chrome.runtime.sendMessage(
  { message: BackgroundCalls.GET_PROMPT },
  (response: Prompt) => {
    const { siteType, message } = response;
    const client = new ChatGPTClient();
    client.sendMessage(message);
  }
);
