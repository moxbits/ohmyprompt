export default class WebPageClient {
  constructor() {
    this._bodyClone = this.__getBodyCloneDOM();
  }

  getPageAsText() {
    return this.__extractTextFromBody();
  }

  __extractTextFromBody() {
    this.__removeAllStyleTags();
    this.__removeAllScriptTags();
    return this._bodyClone.textContent;
  }

  __removeAllStyleTags() {
    this._bodyClone.querySelectorAll("style").forEach((style) => {
      style.parentNode.removeChild(style);
    });
  }

  __removeAllScriptTags() {
    this._bodyClone.querySelectorAll("script").forEach((script) => {
      script.parentNode.removeChild(script);
    });
  }

  __getBodyCloneDOM() {
    return document.body.cloneNode(true);
  }
}
