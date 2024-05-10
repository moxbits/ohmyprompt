export default class Storage {
  static defaults = {
    engine: "chatgpt",
    youtubePrompt:
      "Summarize the youtube video transcript that i provided for you and do not omit the important parts and details of it",
    twitterPrompt:
      "Summarize all of the tweets that you have been provided each by each. each one should be summarized into one line and its link to its url should also be given. Also categorize all of the tweets and at the end of your report tell me which events and important things were happening in the whole list of tweets",
    threadPrompt:
      "Summarize the tweets that i provided you. explain the context of the thread and the insights that we can get out of it.",
    webpagePrompt: "Summarize the provided webpage content that i gave you",
    selectionPrompt:
      "Summarize all the contents that you have been given in this chat as much as you can",
  };

  static get(keys, callback = () => {}) {
    browser.storage.local.get(keys).then(callback);
  }

  static set(object, callback = () => {}) {
    browser.storage.local.set(object).then(callback);
  }

  static initializeStorage() {
    this.get(
      [
        "engine",
        "youtubePrompt",
        "twitterPrompt",
        "threadPrompt",
        "webpagePrompt",
        "selectionPrompt",
      ],
      (data = {}) => {
        if (!data.engine) this.set({ engine: this.defaults.engine });

        if (!data.youtubePrompt)
          this.set({ youtubePrompt: this.defaults.youtubePrompt });

        if (!data.twitterPrompt)
          this.set({ twitterPrompt: this.defaults.twitterPrompt });

        if (!data.threadPrompt)
          this.set({ threadPrompt: this.defaults.threadPrompt });

        if (!data.webpagePrompt)
          this.set({ webpagePrompt: this.defaults.webpagePrompt });

        if (!data.selectionPrompt)
          this.set({ selectionPrompt: this.defaults.selectionPrompt });
      },
    );
  }
}
