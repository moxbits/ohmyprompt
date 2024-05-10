export default class Context {
  static createItem(...options) {
    chrome.contextMenus.create(...options);
  }

  static addClickListener(callback) {
    chrome.contextMenus.onClicked.addListener(callback);
  }
}
