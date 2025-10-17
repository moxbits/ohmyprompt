import BaseStorage from "../core/utils/baseStorage";

export default class Storage extends BaseStorage {
  static get(keys, callback = () => {}) {
    browser.storage.local.get(keys).then(callback);
  }

  static set(object, callback = () => {}) {
    browser.storage.local.set(object).then(callback);
  }
}
