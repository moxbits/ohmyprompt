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
    return document.querySelector("textarea#prompt-textarea");
  }

  __getSubmitBtnElement() {
    return document.querySelector(
      "button[data-testid=send-button]",
    );
  }
}
