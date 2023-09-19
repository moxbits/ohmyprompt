import requests from "../utils/requests";

import TwitterClient from "../services/twitter/client";

async function startTweetsHandler({ amount = 20 }) {
  const client = new TwitterClient();
  const tweets = await client.getPageTweets(amount);

  const prompt = {
    title:
      "I want to provide you content of a series of tweets texts.\nHere are the following tweets:",
    content: client.tweetsToString(tweets),
    ending:
      "Categorize all of the tweet contents that i provided you. and list all of them in their category with sumarizing it as much as you can in one line and providing the given urls to it",
    tokenLimit: 10000,
  };

  requests.sendPromptToChatGPT(prompt);
}

async function startThreadHandler() {
  const client = new TwitterClient();
  const threadTweets = await client.getThreadTweets();

  const prompt = {
    title:
      "I want to provide you content of a thread of tweets.\nHere are the following tweets:",
    content: client.tweetsToString(threadTweets),
    ending:
      "Summarize the tweets that i provided you. explain the context of the thread and the insights that we can get out of it.",
    tokenLimit: 10000,
  };

  requests.sendPromptToChatGPT(prompt);
}

function isCurrentPageThread() {
  const currentPageURL = window.location.href;
  return currentPageURL.includes("/status/");
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case requests.types.GET_TWEETS:
      startTweetsHandler(message.twitterOptions);
      break;

    case requests.types.GET_THREADS_TWEETS:
      startThreadHandler();
      break;

    case requests.types.GET_SITE_TYPE:
      const isThread = isCurrentPageThread();

      if (isThread) sendResponse({ type: "twitter-thread" });
      else sendResponse({ type: "twitter" });

      break;

    default:
      console.log("TwitterHandler: no such action available!");
  }
});
