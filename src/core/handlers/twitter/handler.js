import Messages from "../../browser-messages";
import Storage from "../../browser-storage";

import Modal from "../../utils/modal";
import tweetsModalContent from "../../../../views/modal/tweets-modal.html?raw";

import TwitterClient from "./client";

import { types, getSiteType } from "../../utils/types";

async function extractTweetsAndDisplayPrompt(amount) {
  const client = new TwitterClient();
  const tweets = await client.getPageTweets(amount);
  const modal = new Modal();

  Storage.get("twitterPrompt", (data) => {
    const prompt = {
      content: client.tweetsToString(tweets),
      template: data.twitterPrompt,
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
              content: client.tweetsToString(threadTweets),
              template: data.threadPrompt,
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
