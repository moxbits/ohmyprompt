import Messages from "../browser-messages";
import Storage from "../browser-storage";
import Tabs from "../browser-tabs";

import Modal from "../modal";
import tweetsModalContent from "../../../views/modal/tweets-modal.html?raw";

import TwitterClient from "../services/twitter/client";
import { types, getSiteType } from "../utils/types";

async function extractTweetsAndDisplayPrompt(amount) {
  const client = new TwitterClient();
  const tweets = await client.getPageTweets(amount);
  const modal = new Modal();

  Storage.get("twitterPrompt", (data) => {
    const prompt = {
      title:
        "I want to provide you content of a series of tweets texts. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
      content: client.tweetsToString(tweets),
      ending: data.twitterPrompt,
    };

    modal.setPrompt(prompt);
    modal.show();
  });
}

function showTweetsAmountModal() {
  const modal = new Modal(tweetsModalContent, {
    events: () => {
      document
        .querySelector("#ohmychat-prompt-modal #twitter-tweets-btn")
        .addEventListener("click", () => {
          const amount = document.querySelector(
            "#ohmychat-prompt-modal #tweets-amount",
          ).value;

          document.querySelector("#ohmychat-prompt-modal").remove();

          extractTweetsAndDisplayPrompt(amount);
        });
    },
  });
  modal.show();
}

Messages.addListener(async (message) => {
  switch (message.action) {
    case types.GET_TWEETS:
      const { amount } = message.twitterOptions;
      extractTweetsAndDisplayPrompt(amount);
      break;

    case types.GEN_PROMPT:
      const siteType = await getSiteType();

      switch (siteType) {
        case "twitter":
          showTweetsAmountModal();
          break;

        case "twitter-thread":
          const client = new TwitterClient();
          const threadTweets = await client.getThreadTweets();

          Storage.get("threadPrompt", (data) => {
            const prompt = {
              title:
                "I want to provide you content of a thread of tweets. Each tweet is seperated using `;@=#=#=#=@;`. Here are the following tweets:",
              content: client.tweetsToString(threadTweets),
              ending: data.threadPrompt,
            };

            const modal = new Modal();
            modal.setPrompt(prompt);
            modal.show();
          });
          break;
      }

      break;
  }

  Messages.send({
    action: types.MODAL_LOADED,
  });
});

console.log("i got there!!!");
