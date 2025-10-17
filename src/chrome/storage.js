import BaseStorage from "../core/utils/baseStorage";

export default class Storage extends BaseStorage {
  static get(keys, callback = () => {}) {
    chrome.storage.sync.get(keys, callback);
  }

  static set(object, callback = () => {}) {
    chrome.storage.sync.set(object, callback);
  }
}
