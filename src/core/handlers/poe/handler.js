import Messages from "../../browser-messages";

import PoeClient from "./client";

import { types } from "../../utils/types";
import { delay } from "../../utils/time";

async function startPoeHandler() {
  const { prompt } = await Messages.send({ action: types.GET_PROMPT });

  await delay(2000);
  const client = new PoeClient();
  await client.sendMessage(prompt);
}

startPoeHandler();
