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

  static sendMessageToCurrentTab(message, extras = null, callback = null) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: message,
          ...extras,
        },
        callback,
      );
    });
  }
}
