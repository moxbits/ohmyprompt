export default class WebPageClient {
  constructor() {
    this._bodyClone = this.__getBodyCloneDOM();
  }

  getPageAsText() {
    return this.__extractTextFromBody();
  }

  getPageTitle() {
    return document.title;
  }

  __extractTextFromBody() {
    this.__removeAllStyleTags();
    this.__removeAllScriptTags();
    const rawText = this._bodyClone.textContent;
    return rawText.replaceAll("\t", " ").replaceAll("\n", " ");
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
