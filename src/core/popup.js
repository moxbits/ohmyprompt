import Storage from "./browser-storage";
import Tabs from "./browser-tabs";

import { types } from "./utils/types";

function initPopup() {
  getSiteType(showPopupBasedOnSiteType);
  selectActiveEngine();
}

function getSiteType(callback) {
  Tabs.getCurrentTab((tab) => {
    if (tab && tab.url) {
      if (tab.url.includes("youtube.com")) callback("youtube");
      else if (/https:\/\/twitter\.com\/[^\/]+\/status\/\d+/.test(tab.url))
        callback("twitter-thread");
      else if (tab.url.includes("twitter.com")) callback("twitter");
      else callback("webpage");
    } else callback("about");
  });
}

function selectActiveEngine() {
  Storage.get("engine", (data) => {
    document.querySelectorAll(".llm_engine_select").forEach((item) => {
      switch (data.engine) {
        case "chatgpt":
          item.selectedIndex = 0;
          break;
        case "chatgpt-split":
          item.selectedIndex = 1;
          break;
        case "claude":
          item.selectedIndex = 2;
          break;
      }
    });
  });
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

    case "webpage":
      document.querySelector(".container.normal").classList.remove("hidden");
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
    Tabs.create({ url: "views/settings.html" });
  });
});

document
  .querySelector("#youtube-transcript-btn")
  .addEventListener("click", () => {
    Tabs.sendMessageToCurrentTab(types.GET_YOUTUBE_TRANSCRIPT);
  });

document.querySelector("#webpage-content-btn").addEventListener("click", () => {
  Tabs.sendMessageToCurrentTab(types.GET_WEBPAGE_CONTENT);
});

document.querySelector("#twitter-tweets-btn").addEventListener("click", () => {
  const tweetAmounts = document.querySelector("#tweets-amount").value;
  Tabs.sendMessageToCurrentTab(types.GET_TWEETS, {
    twitterOptions: {
      amount: tweetAmounts,
    },
  });
});

document.querySelector("#twitter-thread-btn").addEventListener("click", () => {
  Tabs.sendMessageToCurrentTab(types.GET_THREAD_TWEETS);
});

document.querySelectorAll(".llm_engine_select").forEach((element) => {
  element.addEventListener("click", ({ target }) => {
    const engine = target.value;

    Storage.set({ engine });
  });
});

initPopup();
