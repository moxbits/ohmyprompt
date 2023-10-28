import { delay } from "../../utils/time";

export default class ClaudeClient {
  __selectors = {
    textBox: "fieldset > div > div > div > div > p",
    submitBtn: "fieldset > div > div > button",
  };

  constructor() {}

  async sendMessage({ title, content, ending }) {
    const text = `${title}: \`\`\`${content}\`\`\` ${ending}`;
    await this.__fillMessageAndSubmit(text);
    console.log(content);
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
