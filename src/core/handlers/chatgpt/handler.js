import Messages from "../../browser-messages";

import ChatGPTClient from "./client";

import { types } from "../../utils/types";

async function startChatGPTHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });
  const client = new ChatGPTClient();
  await client.sendMessage(prompt);
}

startChatGPTHandler();
