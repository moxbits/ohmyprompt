export default class Tabs {
  static create({ url }) {
    chrome.tabs.create({ url });
  }

  static getCurrentTab(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTab = tabs[0];
      callback(currentTab);
    });
  }

  static async sendMessageToCurrentTab(message) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    return chrome.tabs.sendMessage(tab.id, message);
  }
}
