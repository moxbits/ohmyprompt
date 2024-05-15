import Messages from "../browser-messages";

import GeminiClient from "../services/gemini/client";

import { types } from "../utils/types";
import { delay } from "../utils/time";

async function startGeminiHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  await delay(2000);
  const client = new GeminiClient();
  await client.sendMessage(prompt);
}

startGeminiHandler();
