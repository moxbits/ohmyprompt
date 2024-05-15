import Messages from "../browser-messages";

import HuggingChatClient from "../services/huggingChat/client";

import { types } from "../utils/types";
import { delay } from "../utils/time";

async function startHuggingChatHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  await delay(2000);
  const client = new HuggingChatClient();
  await client.sendMessage(prompt);
}

startHuggingChatHandler();
