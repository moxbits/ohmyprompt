export default class Context {
  static createItem(...options) {
    browser.contextMenus.create(...options);
  }

  static addClickListener(callback) {
    browser.contextMenus.onClicked.addListener(callback);
  }
}
