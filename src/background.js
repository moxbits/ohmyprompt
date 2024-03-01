import requests from "./utils/requests";

import initializeStorage from "./utils/storage";

const promptStack = [];

initializeStorage();

function openEngineLLM() {
  chrome.storage.sync.get("engine", ({ engine }) => {
    switch (engine) {
      case "chatgpt":
      case "chatgpt-split":
        chrome.tabs.create({ url: "https://chat.openai.com/?ohmychat=1" });
        break;
      case "claude":
        chrome.tabs.create({ url: "https://claude.ai/chats?ohmychat=1" });
        break;
      default:
        console.error("no such engine available!!!");
    }
  });
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const { action, prompt } = request;

  switch (action) {
    case requests.types.NEW_PROMPT:
      promptStack.push(prompt);
      openEngineLLM();
      break;

    case requests.types.GET_PROMPT:
      sendResponse({ prompt: promptStack.pop() });
      break;

    default:
      console.log("Not a valid option call");
  }
});

chrome.contextMenus.onClicked.addListener((info) => {
  switch (info.menuItemId) {
    case "summarizeContentItem":
      const content = info.selectionText;
      chrome.storage.sync.get("selectionPrompt", ({ selectionPrompt }) => {
        const prompt = {
          title:
            "Here you will be prompted with content to summarize. wait for it in next prompts",
          content,
          ending: selectionPrompt,
          tokenLimit: 20000,
        };

        promptStack.push(prompt);
        openEngineLLM();
      });
      break;

    default:
      console.error("no such context menu option");
  }
});

chrome.contextMenus.create({
  id: "summarizeContentItem",
  title: "Summarize selected content",
  contexts: ["selection"],
});
