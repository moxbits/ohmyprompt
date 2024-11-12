export default class BaseStorage {
  static defaults = {
    engine: "chatgpt",
    youtubePrompt:
      "Here content of a youtube video transcript is provided:\n{{%prompt-text%}}\nSummarize the youtube video transcript provided for you and do not omit the important parts and details of it.",
    twitterPrompt:
      "Here content of a series of tweets are provided:\n{{%prompt-text%}}\nSummarize provided tweets. each one should be summarized into one line and its link to its url should also be given. Also categorize all of the tweets and at the end of your report tell me which events and important things were happening in the whole list of tweets",
    threadPrompt:
      "Here content of a thread of tweets are provided. Here are the following tweets:\n{{%prompt-text%}}\nSummarize the provided tweets and explain the context of the thread and the insights that can be extracted out of it.",
    selectionPrompt:
      "Here textual content are provided:\n{{%prompt-text%}}\nSummarize all the provided content in this chat as much as you can and highlight the important details",
  };

  static initializeStorage() {
    this.get(
      [
        "engine",
        "youtubePrompt",
        "twitterPrompt",
        "threadPrompt",
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

        if (!data.selectionPrompt)
          this.set({ selectionPrompt: this.defaults.selectionPrompt });
      },
    );
  }
}
