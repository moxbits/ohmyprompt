export default class Tabs {
  static create({ url }) {
    browser.tabs.create({ url });
  }

  static async getCurrentTab() {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    return tab;
  }

  static async sendMessageToCurrentTab(message) {
    const tab = await this.getCurrentTab();
    return browser.tabs.sendMessage(tab.id, message);
  }

  static sendMessage(tabId, message) {
    return browser.tabs.sendMessage(tabId, message);
  }

  static onUpdate(callback) {
    browser.tabs.onUpdated.addListener(callback);
  }

  static async executeScript(tabId, data) {
    browser.tabs.executeScript(tabId, data);
  }

  static isUsable() {
    return !!browser.tabs;
  }
}
