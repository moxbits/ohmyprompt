import {
  Prompt,
  BackgroundRequest,
  Messages,
  BackgroundSendResponse,
} from "./utils/types";

const promptStack = [
  {
    message: "hello dude",
    siteType: "",
  },
];

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  const { message, prompt } = request;

  switch (message) {
    case Messages.NEW_PROMPT:
      promptStack.push(prompt);
      break;

    case Messages.GET_PROMPT:
      sendResponse({ message: "hey dude", siteType: "" });
      break;

    default:
      console.log("Not a valid option call");
  }
});
