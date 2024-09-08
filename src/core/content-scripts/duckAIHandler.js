import Messages from "../browser-messages";

import DuckAIClient from "../services/duckAI/client";

import { types } from "../utils/types";
import { delay } from "../utils/time";

async function startDuckAIHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  await delay(2000);
  const client = new DuckAIClient();
  await client.sendMessage(prompt);
}

startDuckAIHandler();
