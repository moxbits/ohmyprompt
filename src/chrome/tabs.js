export default class Tabs {
  static create({ url }) {
    chrome.tabs.create({ url });
  }

  static async getCurrentTab() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    return tab;
  }

  static async sendMessageToCurrentTab(message) {
    const tab = await this.getCurrentTab();
    return chrome.tabs.sendMessage(tab.id, message);
  }

  static sendMessage(tabId, message) {
    return chrome.tabs.sendMessage(tabId, message);
  }

  static onUpdate(callback) {
    chrome.tabs.onUpdated.addListener(callback);
  }

  static executeScript(tabId, data) {
    chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      files: [data.file],
    });
  }

  static isUsable() {
    return !!chrome.tabs;
  }
}
