export default class ChatGPTUIHandler {
  static htmlSelectors = {
    TEXTBOX: "",
    SUBMIT: "",
  };

  static TEXT_SIZE_LIMIT = 1000;

  constructor() {
    this.rawText = "";
    this.textChunks = [];
  }

  prompt(text) {
    this.rawText = text;
    this.processText();
    this.feedChatGPTWithData();
  }

  processText() {
    this.chunkInputText();
  }

  chunkInputText() {
    this.textChunks = [];
  }

  feedChatGPTWithData() {
    for (const text of this.textChunks) {
    }
  }
}
