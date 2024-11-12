import { delay } from "../../utils/time";

export default class PoeClient {
  __selectors = {
    textBox:
      "div.GrowingTextArea_growWrap__im5W3.ChatMessageInputContainer_textArea__fNi6E > textarea",
    submitBtn:
      "button.Button_buttonBase__Bv9Vx.Button_primary__6UIn0.ChatMessageSendButton_sendButton__4ZyI4.ChatMessageInputContainer_sendButton__dBjTt",
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
