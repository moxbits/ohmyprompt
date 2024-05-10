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

  static sendMessageToCurrentTab(message, extras = {}, callback = () => {}) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs
        .sendMessage(tabs[0].id, {
          action: message,
          ...extras,
        })
        .then(callback);
    });
  }
}
