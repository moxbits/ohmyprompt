export default class Tabs {
  static create({ url }) {
    browser.tabs.create({ url });
  }

  static getCurrentTab(callback) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const currentTab = tabs[0];
      callback(currentTab);
    });
  }

  static async sendMessageToCurrentTab(message) {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    return browser.tabs.sendMessage(tab.id, message);
  }
}
