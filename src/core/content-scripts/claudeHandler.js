import Messages from "../browser-messages";

import ClaudeClient from "../services/claude/client";

import { types } from "../utils/types";
import { delay } from "../utils/time";

async function startClaudeHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  await delay(2000);
  const client = new ClaudeClient();
  await client.sendMessage(prompt);
}

startClaudeHandler();
console.log("content-script injected!!!");
