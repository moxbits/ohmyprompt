import { waitUntil } from "../../utils/time";

export default class ChatGPTClient {
  constructor() {}

  async sendMessage(text) {
    await this.__insertTextIntoChatGPTAndSubmit(text);
  }

  async __insertTextIntoChatGPTAndSubmit(text) {
    const textarea = document.querySelector("#prompt-textarea");
    textarea.innerHTML = `<p>${text}</p>`;

    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);

    await this.__waitForSubmitButtonToGetGreen();

    document.querySelector("button[data-testid=send-button]").click();
  }

  async __waitForSubmitButtonToGetGreen() {
    await waitUntil(() => !this.__getSubmitBtnElement().disabled);
  }
}
