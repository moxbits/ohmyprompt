import requests from "../utils/requests";

import TwitterClient from "../services/twitter/client";

async function startTweetsHandler({ amount = 20 }) {
  const client = new TwitterClient();
  const tweets = await client.getPageTweets(amount);

  chrome.storage.sync.get("twitterPrompt", ({ twitterPrompt }) => {
    const prompt = {
      title:
        "I want to provide you content of a series of tweets texts. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
      content: client.tweetsToString(tweets),
      ending: twitterPrompt,
      tokenLimit: 10000,
    };

    requests.sendPromptToChatGPT(prompt);
  });
}

async function startThreadHandler() {
  const client = new TwitterClient();
  const threadTweets = await client.getThreadTweets();

  chrome.storage.sync.get("threadPrompt", ({ threadPrompt }) => {
    const prompt = {
      title:
        "I want to provide you content of a thread of tweets. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
      content: client.tweetsToString(threadTweets),
      ending: threadPrompt,
      tokenLimit: 10000,
    };

    requests.sendPromptToChatGPT(prompt);
  });
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
