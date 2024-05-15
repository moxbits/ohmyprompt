import Messages from "./browser-messages";
import Storage from "./browser-storage";
import Context from "./browser-context";
import Tabs from "./browser-tabs";

import { types } from "./utils/types";

const promptStack = [];

Storage.initializeStorage();

function openEngineLLM() {
  Storage.get("engine", (data) => {
    switch (data.engine) {
      case "chatgpt":
        Tabs.create({ url: "https://chatgpt.com/?ohmychat=1" });
        break;
      case "gemini":
        Tabs.create({ url: "https://gemini.google.com/app?ohmychat=1" });
        break;
      case "claude":
        Tabs.create({ url: "https://claude.ai/chats?ohmychat=1" });
        break;
      case "hugging-chat":
        Tabs.create({ url: "https://huggingface.co/chat/?ohmychat=1" });
        break;
      case "poe":
        Tabs.create({ url: "https://poe.com/?ohmychat=1" });
        break;
      default:
        console.error("no such engine available!!!");
    }
  });
}

Messages.addListener((request, _, sendResponse) => {
  const { action, prompt } = request;

  switch (action) {
    case types.NEW_PROMPT:
      promptStack.push(prompt);
      openEngineLLM();
      break;

    case types.GET_PROMPT:
      sendResponse({ prompt: promptStack.pop() });
      break;
  }
});

Context.addClickListener((info) => {
  switch (info.menuItemId) {
    case "summarizeContentItem":
      const content = info.selectionText;

      Storage.get("selectionPrompt", (data) => {
        const prompt = {
          title:
            "Here you will be prompted with content to summarize. wait for it in next prompts",
          content,
          ending: data.selectionPrompt,
        };

        promptStack.push(prompt);
        openEngineLLM();
      });
      break;

    default:
      console.error("no such context menu option");
  }
});

Context.createItem({
  id: "summarizeContentItem",
  title: "Summarize selected content",
  contexts: ["selection"],
});
