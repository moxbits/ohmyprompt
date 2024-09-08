import { delay } from "../../utils/time";

export default class ClaudeClient {
  __selectors = {
    textBox: "div[enterkeyhint=enter] p",
    submitBtn: "button[aria-label=\"Send Message\"]",
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
    document.querySelector(this.__selectors.textBox).innerText = text;
  }

  __submitPrompt() {
    document.querySelector(this.__selectors.submitBtn).click();
  }
}
