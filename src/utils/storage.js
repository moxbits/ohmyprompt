export const defaults = {
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

export default function initializeStorage() {
  chrome.storage.sync.get(
    [
      "engine",
      "youtubePrompt",
      "twitterPrompt",
      "threadPrompt",
      "webpagePrompt",
      "selectionPrompt",
    ],
    ({
      engine,
      youtubePrompt,
      twitterPrompt,
      threadPrompt,
      webpagePrompt,
      selectionPrompt,
    }) => {
      if (chrome.runtime.lastError)
        return console.error(chrome.runtime.lastError);

      if (!engine) {
        chrome.storage.sync.set({ engine: defaults.engine }, () => {
          if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
          else console.log("Engine set to default value:", defaults.engine);
        });
      }

      if (!youtubePrompt) {
        chrome.storage.sync.set(
          { youtubePrompt: defaults.youtubePrompt },
          () => {
            if (chrome.runtime.lastError)
              console.error(chrome.runtime.lastError);
            else
              console.log(
                "Youtube video prompt set to default value:",
                defaults.youtubePrompt
              );
          }
        );
      }

      if (!twitterPrompt) {
        chrome.storage.sync.set(
          { twitterPrompt: defaults.twitterPrompt },
          () => {
            if (chrome.runtime.lastError)
              console.error(chrome.runtime.lastError);
            else
              console.log(
                "Twitter tweets list prompt set to default value:",
                defaults.twitterPrompt
              );
          }
        );
      }

      if (!threadPrompt) {
        chrome.storage.sync.set({ threadPrompt: defaults.threadPrompt }, () => {
          if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
          else
            console.log(
              "Twitter threads prompt set to default value:",
              defaults.threadPrompt
            );
        });
      }

      if (!webpagePrompt) {
        chrome.storage.sync.set(
          { webpagePrompt: defaults.webpagePrompt },
          () => {
            if (chrome.runtime.lastError)
              console.error(chrome.runtime.lastError);
            else
              console.log(
                "Webpages prompt set to default value:",
                defaults.webpagePrompt
              );
          }
        );
      }

      if (!selectionPrompt) {
        chrome.storage.sync.set(
          { selectionPrompt: defaults.selectionPrompt },
          () => {
            if (chrome.runtime.lastError)
              console.error(chrome.runtime.lastError);
            else
              console.log(
                "Selected texts prompt set to default value:",
                defaults.selectionPrompt
              );
          }
        );
      }
    }
  );
}
