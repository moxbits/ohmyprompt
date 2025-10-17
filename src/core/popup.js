import Messages from "./browser-messages";
import Tabs from "./browser-tabs";

import { types, getSiteType } from "./utils/types";

async function initPopup() {
  const siteType = await getSiteType();
  showPopupBasedOnSiteType(siteType);
}

function showPopupBasedOnSiteType(siteType) {
  hideAllContainers();

  switch (siteType) {
    case "youtube":
      document.querySelector(".container.youtube").classList.remove("hidden");
      break;
    case "twitter":
      document.querySelector(".container.twitter").classList.remove("hidden");
      break;
    case "twitter-thread":
      document
        .querySelector(".container.twitter-thread")
        .classList.remove("hidden");
      break;
    default:
      document.querySelector(".container.about").classList.remove("hidden");
  }
}

function hideAllContainers() {
  document.querySelectorAll(".container").forEach((item) => {
    if (!item.classList.contains("hidden")) item.classList.add("hidden");
  });
}

document.querySelectorAll(".settings_icon").forEach((item) => {
  item.addEventListener("click", () => {
    Tabs.create({ url: "/views/settings.html" });
  });
});

document
  .querySelector("#youtube-transcript-btn")
  .addEventListener("click", ({ target }) => {
    target.classList.add("hidden");

    document
      .querySelector(".container.youtube .loading-image")
      .classList.remove("hidden");

    Tabs.sendMessageToCurrentTab({
      action: types.GEN_PROMPT,
    });
  });

document
  .querySelector("#twitter-thread-btn")
  .addEventListener("click", async ({ target }) => {
    Messages.send({ action: types.BYPASS_CSP });

    target.classList.add("hidden");

    document
      .querySelector(".container.twitter-thread .loading-image")
      .classList.remove("hidden");

    Tabs.sendMessageToCurrentTab({
      action: types.GEN_PROMPT,
    });
  });

document
  .querySelector("#twitter-tweets-btn")
  .addEventListener("click", async ({ target }) => {
    Messages.send({ action: types.BYPASS_CSP });

    target.classList.add("hidden");
    document
      .querySelector(".container.twitter .loading-image")
      .classList.remove("hidden");

    const tweetAmounts = document.querySelector("#tweets-amount").value;
    Tabs.sendMessageToCurrentTab({
      action: types.GET_TWEETS,
      twitterOptions: {
        amount: tweetAmounts,
      },
    });
  });

initPopup();
