export default class ChatGPTUIHandler {
  private rawText: string;
  private textChunks: string[];

  private static htmlSelectors = {
    TEXTBOX: '',
    SUBMIT: '',
  }

  private static TEXT_SIZE_LIMIT = 1000;

  constructor() {
    this.rawText = '';
    this.textChunks = [];
  }

  public prompt(text: string) {
    this.rawText = text;
    this.processText();
    this.feedChatGPTWithData();
  }

  private processText() {
    this.chunkInputText();
  }

  private chunkInputText() {
    this.textChunks = [];
  }

  private feedChatGPTWithData() {
    for (const text of this.textChunks) {

    }
  }

}
