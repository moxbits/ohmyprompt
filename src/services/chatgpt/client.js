import { delay } from "../../utils/time";

export default class ChatGPTClient {
  constructor() {}

  static TOKEN_LIMIT = 30000;

  static LARGE_MESSAGE_START_PROMPT =
    "From now i just send you prompts. just read them and process them. don't say anything about it. just say `got it` and continue. at the end i will tell you this: `THE PROMPT IS NOW COMPLETE!!!` and then you tell me anything that you learned from it";
  static LARGE_MESSAGE_END_PROMPT = "THE PROMPT IS NOW COMPLETE!!!";

  async sendMessage(text) {
    if (text.length < ChatGPTClient.TOKEN_LIMIT)
      await this.__insertTextIntoChatGPTAndSubmit(text);
    else await this.__sendLargeMessage(text);
  }

  async __sendLargeMessage(text) {
    const prompts = this.__splitLargeTextIntoSmallerTexts(text);

    await this.__insertTextIntoChatGPTAndSubmit(
      ChatGPTClient.LARGE_MESSAGE_START_PROMPT
    );

    for (const prompt of prompts) {
      await this.__sendNextMessageAndWait(prompt);
      console.log(prompt);
    }

    await this.__sendNextMessageAndWait(ChatGPTClient.LARGE_MESSAGE_END_PROMPT);
  }

  __splitLargeTextIntoSmallerTexts(text) {
    const substrings = [];
    let currentIndex = 0;
    const maxLength = ChatGPTClient.TOKEN_LIMIT;

    while (currentIndex < text.length) {
      const substring = text.substr(currentIndex, maxLength);
      substrings.push(substring);
      currentIndex += maxLength;
    }

    return substrings;
  }

  async __insertTextIntoChatGPTAndSubmit(text) {
    const textarea = document.querySelector("textarea");
    textarea.value = text;

    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);

    await delay(1000);

    const submitBtn = [...document.querySelectorAll("button")].at(-2);
    submitBtn.click();
  }

  async __sendNextMessageAndWait(text) {
    while (true) {
      const currentButtonText = document.querySelector(
        "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button"
      ).innerText;

      await delay(1000);

      if (currentButtonText != "Stop generating") {
        this.__insertTextIntoChatGPTAndSubmit(text);
        break;
      }
    }
  }
}
