import Messages from "./browser-messages";
import Storage from "./browser-storage";
import Context from "./browser-context";
import Tabs from "./browser-tabs";

import { bypassCSP, disableCSPBypass } from "./browser-csp-bypass";

import { types } from "./utils/types";

const promptStack = [];

Storage.initializeStorage();

function openEngineLLM() {
  Storage.get("engine", (data) => {
    switch (data.engine) {
      case "chatgpt":
        Tabs.create({ url: "https://chatgpt.com/?ohmyprompt=1" });
        break;
      case "gemini":
        Tabs.create({ url: "https://gemini.google.com/app?ohmyprompt=1" });
        break;
      case "claude":
        Tabs.create({ url: "https://claude.ai/chats?ohmyprompt=1" });
        break;
      case "duck-ai":
        Tabs.create({
          url: "https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1&ohmyprompt=1",
        });
        break;
      case "hugging-chat":
        Tabs.create({ url: "https://huggingface.co/chat/?ohmyprompt=1" });
        break;
      case "poe":
        Tabs.create({ url: "https://poe.com/?ohmyprompt=1" });
        break;
      default:
        console.error("no such engine available!!!");
    }
  });
}

Messages.addListener((request, _, sendResponse) => {
  switch (request.action) {
    case types.SAVE_PROMPT:
      promptStack.push(request.prompt);
      openEngineLLM();
      break;

    case types.GET_PROMPT:
      sendResponse({ prompt: promptStack.pop() });
      break;

    case types.BYPASS_CSP:
      bypassCSP();
      break;

    case types.DISABLE_CSP_BYPASS:
      disableCSPBypass();
      break;
  }
});

Context.addClickListener((info) => {
  switch (info.menuItemId) {
    case "generatePromptItem":
      Tabs.sendMessageToCurrentTab({ action: types.GEN_PROMPT });
      break;

    case "summarizeContentItem":
      const content = info.selectionText;

      Storage.get("selectionPrompt", (data) => {
        const prompt = {
          content,
          template: data.selectionPrompt,
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

Context.createItem({
  id: "generatePromptItem",
  title: "Generate prompt",
  contexts: ["page"],
});
