import { waitUntil } from "../../utils/time";

export default class ChatGPTClient {
  constructor() {}

  async sendMessage(text) {
    await this.__insertTextIntoChatGPTAndSubmit(text);
  }

  async __insertTextIntoChatGPTAndSubmit(text) {
    const textarea = this.__getTextareaElement();
    textarea.value = text;

    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);

    await this.__waitForSubmitButtonToGetGreen();

    this.__getSubmitBtnElement().click();
  }

  async __waitForSubmitButtonToGetGreen() {
    await waitUntil(() => !this.__getSubmitBtnElement().disabled);
  }

  __getTextareaElement() {
    return document.querySelector("textarea");
  }

  __getSubmitBtnElement() {
    return document.querySelector("[data-testid=send-button]");
  }

  __getGeneratorBtnElement() {
    return document.querySelector(
      "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button",
    );
  }
}
