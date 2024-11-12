import { delay } from "../../utils/time";

export default class DuckAIClient {
  __selectors = {
    textBox: "textarea[name=user-prompt]",
    submitBtn: "button[aria-label=Send]",
  };

  constructor() {}

  async sendMessage(text) {
    await this.__fillMessageAndSubmit(text);
  }

  async __fillMessageAndSubmit(text) {
    this.__fillTextBox(text);
    await delay(1000);
    this.__submitPrompt();
  }

  __fillTextBox(text) {
    const textarea = document.querySelector(this.__selectors.textBox);
    textarea.value = text;
    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);
  }

  __submitPrompt() {
    document.querySelector(this.__selectors.submitBtn).click();
  }
}
