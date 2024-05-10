import { types } from "../core/utils/types";

export default class Messages {
  static send(object) {
    return browser.runtime.sendMessage(object);
  }

  static addListener(callback) {
    browser.runtime.onMessage.addListener(callback);
  }

  static sendPromptToLLM(prompt) {
    return this.send({
      action: types.NEW_PROMPT,
      prompt,
    });
  }
}
