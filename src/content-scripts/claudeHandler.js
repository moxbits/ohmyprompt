import requests from "../utils/requests";
import { delay } from "../utils/time";

import ClaudeClient from "../services/claude/client";

async function startClaudeHandler() {
  chrome.runtime.sendMessage(
    { action: requests.types.GET_PROMPT },
    async ({ prompt }) => {
      await delay(2000);
      const client = new ClaudeClient();
      await client.sendMessage(prompt);
    },
  );
}

window.onload = startClaudeHandler;
