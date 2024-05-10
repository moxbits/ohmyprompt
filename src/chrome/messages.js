import { types } from "../core/utils/types";

export default class Messages {
  static send(object) {
    return chrome.runtime.sendMessage(object);
  }

  static addListener(callback) {
    chrome.runtime.onMessage.addListener(callback);
  }

  static sendPromptToLLM(prompt) {
    return this.send({
      action: types.NEW_PROMPT,
      prompt,
    });
  }
}
