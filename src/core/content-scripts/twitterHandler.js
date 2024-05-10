import Messages from "../browser-messages";
import Storage from "../browser-storage";

import TwitterClient from "../services/twitter/client";
import { types } from "../utils/types";

async function startTweetsHandler({ amount = 20 }) {
  const client = new TwitterClient();
  const tweets = await client.getPageTweets(amount);

  Storage.get("twitterPrompt", (data) => {
    const prompt = {
      title:
        "I want to provide you content of a series of tweets texts. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
      content: client.tweetsToString(tweets),
      ending: data.twitterPrompt,
      tokenLimit: 10000,
    };

    Messages.sendPromptToLLM(prompt);
  });
}

async function startThreadHandler() {
  const client = new TwitterClient();
  const threadTweets = await client.getThreadTweets();

  Storage.get("threadPrompt", (data) => {
    const prompt = {
      title:
        "I want to provide you content of a thread of tweets. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
      content: client.tweetsToString(threadTweets),
      ending: data.threadPrompt,
      tokenLimit: 10000,
    };

    Messages.sendPromptToLLM(prompt);
  });
}

function isCurrentPageThread() {
  const currentPageURL = window.location.href;
  return currentPageURL.includes("/status/");
}

Messages.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case types.GET_TWEETS:
      startTweetsHandler(message.twitterOptions);
      break;

    case types.GET_THREADS_TWEETS:
      startThreadHandler();
      break;

    case types.GET_SITE_TYPE:
      const isThread = isCurrentPageThread();
      if (isThread) sendResponse({ type: "twitter-thread" });
      else sendResponse({ type: "twitter" });
      break;
  }
});
