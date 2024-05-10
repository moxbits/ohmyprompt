import Messages from "../browser-messages";
import Storage from "../browser-storage";

import ChatGPTClient from "../services/chatgpt/client";
import { types } from "../utils/types";

async function startChatGPTHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  Storage.get("engine", async (data) => {
    const client = new ChatGPTClient();
    switch (data.engine) {
      case "chatgpt":
        await client.sendMessage(prompt);
        break;
      case "chatgpt-split":
        await client.sendMessageWithSplit(prompt);
        break;
    }
  });
}

startChatGPTHandler();
