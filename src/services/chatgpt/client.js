import WaitingModal from "../../utils/waiting";

import { waitUntil } from "../../utils/time";

export default class ChatGPTClient {
  constructor() {}

  async sendMessage({ title, content, ending, tokenLimit }) {
    this.__tokenLimit = tokenLimit;

    if (content.length < tokenLimit)
      await this.__insertTextIntoChatGPTAndSubmit(
        `${title}\n\n${content}\n\n${ending}`,
      );
    else {
      const prompts = this.__splitLargeTextIntoSmallerTexts(content);

      this.__waitModal = new WaitingModal(
        "Inserting Prompts to ChatGPT",
        prompts.length,
      );

      await this.__waitModal.showLoadingPopup();

      await this.__insertTextIntoChatGPTAndSubmit(title);
      await this.__waitForChatGPTCompleteResponse();

      await this.__sendLargeMessage(prompts);

      await this.__insertTextIntoChatGPTAndSubmit(ending);

      this.__waitModal.closeLoadingPopup();
    }
  }

  async __sendLargeMessage(prompts) {
    for (const prompt of prompts) {
      await this.__insertTextIntoChatGPTAndSubmit(
        `get this prompt chunk, process it, memorize and remember it completely and say 'GOT IT':\n${prompt}`,
      );
      await this.__waitForChatGPTCompleteResponse();
      this.__waitModal.increaseIndexProgress();
    }
  }

  __splitLargeTextIntoSmallerTexts(text) {
    const substrings = [];
    let currentIndex = 0;
    const maxLength = this.__tokenLimit;

    while (currentIndex < text.length) {
      const substring = text.substr(currentIndex, maxLength);
      substrings.push(substring);
      currentIndex += maxLength;
    }

    return substrings;
  }

  async __insertTextIntoChatGPTAndSubmit(text) {
    const textarea = this.__getTextareaElement();
    textarea.value = text;

    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);

    await this.__waitForSubmitButtonToGetGreen();

    this.__getSubmitBtnElement().click();
  }

  async __waitForChatGPTCompleteResponse() {
    await waitUntil(
      () => this.__getGeneratorBtnElement().innerText === "Stop generating",
    );
    await waitUntil(
      () => this.__getGeneratorBtnElement().innerText === "Regenerate",
    );
  }

  async __waitForSubmitButtonToGetGreen() {
    await waitUntil(() => this.__getSubmitBtnElement().style.backgroundColor);
  }

  __getTextareaElement() {
    return document.querySelector("textarea");
  }

  __getSubmitBtnElement() {
    return [...document.querySelectorAll("button")].at(-2);
  }

  __getGeneratorBtnElement() {
    return document.querySelector(
      "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div.relative.flex.h-full.max-w-full.flex-1.overflow-hidden > div > main > div > div.absolute.bottom-0.left-0.w-full.border-t.md\\:border-t-0.dark\\:border-white\\/20.md\\:border-transparent.md\\:dark\\:border-transparent.md\\:bg-vert-light-gradient.bg-white.dark\\:bg-gray-800.md\\:\\!bg-transparent.dark\\:md\\:bg-vert-dark-gradient.pt-2.md\\:pl-2.md\\:w-\\[calc\\(100\\%-\\.5rem\\)\\] > form > div > div:nth-child(1) > div > div.flex.items-center.md\\:items-end > div > button",
    );
  }
}
