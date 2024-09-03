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
  switch (request.action) {
    case types.SAVE_PROMPT:
      console.log("prompt recieved!!!");
      promptStack.push(request.prompt);
      openEngineLLM();
      break;

    case types.GET_PROMPT:
      console.log("prompt sent!!!");
      sendResponse({ prompt: promptStack.pop() });
      break;
  }
});

Tabs.onUpdate((tabId, changeInfo, tab) => {
  if (changeInfo.status == "loading" && tab.url.includes("x.com")) {
    Tabs.executeScript(tabId, {
      file: "twitterHandler.js",
    });
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
