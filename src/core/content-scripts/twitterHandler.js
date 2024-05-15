import Messages from "../browser-messages";
import Storage from "../browser-storage";

import TwitterClient from "../services/twitter/client";
import { types } from "../utils/types";

Messages.addListener(async (message) => {
  const client = new TwitterClient();

  switch (message.action) {
    case types.GET_TWEETS:
      const tweets = await client.getPageTweets(message.twitterOptions.amount);

      Storage.get("twitterPrompt", (data) => {
        const prompt = {
          title:
            "I want to provide you content of a series of tweets texts. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
          content: client.tweetsToString(tweets),
          ending: data.twitterPrompt,
        };

        Messages.send({
          action: types.GET_POPUP_PROMPT,
          dataType: "twitter",
          prompt,
        });
      });
      break;

    case types.GET_THREADS_TWEETS:
      const threadTweets = await client.getThreadTweets();

      Storage.get("threadPrompt", (data) => {
        const prompt = {
          title:
            "I want to provide you content of a thread of tweets. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
          content: client.tweetsToString(threadTweets),
          ending: data.threadPrompt,
        };

        Messages.send({
          action: types.GET_POPUP_PROMPT,
          dataType: "twitter-thread",
          prompt,
        });
      });
      break;
  }
});
