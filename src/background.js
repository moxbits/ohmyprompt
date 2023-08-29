import { messages } from "./utils/types";

const promptStack = [];

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const { action, prompt } = request;

  switch (action) {
    case messages.NEW_PROMPT:
      promptStack.push(prompt);
      break;

    case messages.GET_PROMPT:
      sendResponse({ prompt: promptStack.pop() });
      break;

    default:
      console.log("Not a valid option call");
  }
});
