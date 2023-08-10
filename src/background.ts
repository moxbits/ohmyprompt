import {
  Prompt,
  BackgroundRequest,
  BackgroundCalls,
  BackgroundSendResponse,
} from "./utils/types";

const promptStack: Prompt[] = [];

chrome.runtime.onMessage.addListener(
  (
    request: BackgroundRequest,
    _,
    sendResponse: BackgroundSendResponse
  ) => {
    const { call, prompt } = request;

    switch (call) {
      case BackgroundCalls.NEW_PROMPT:
        promptStack.push(prompt);
        break;

      case BackgroundCalls.GET_PROMPT:
        sendResponse(promptStack.pop());
        break;

      default:
        console.log("Not a valid option call");
    }
  }
);
