import { types } from "../core/utils/types";

export default class Messages {
  static send(object) {
    return chrome.runtime.sendMessage(object);
  }

  static addListener(callback) {
    chrome.runtime.onMessage.addListener(callback);
  }

  static sendPromptToBackground(prompt) {
    return this.send({
      action: types.SAVE_PROMPT,
      prompt,
    });
  }
}
