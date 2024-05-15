import Messages from "./browser-messages";
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
        case "gemini":
          item.selectedIndex = 1;
          break;
        case "claude":
          item.selectedIndex = 2;
          break;
        case "hugging-chat":
          item.selectedIndex = 3;
          break;
        case "poe":
          item.selectedIndex = 4;
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
  .addEventListener("click", async ({ target }) => {
    target.classList.add("hidden");
    document
      .querySelector(".container.youtube .loading-image")
      .classList.remove("hidden");

    Tabs.sendMessageToCurrentTab({
      action: types.GET_YOUTUBE_TRANSCRIPT,
    });
  });

document
  .querySelector("#webpage-content-btn")
  .addEventListener("click", ({ target }) => {
    target.classList.add("hidden");
    document
      .querySelector(".container.normal .loading-image")
      .classList.remove("hidden");

    Tabs.sendMessageToCurrentTab({ action: types.GET_WEBPAGE_CONTENT });
  });

document
  .querySelector("#twitter-tweets-btn")
  .addEventListener("click", ({ target }) => {
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

document
  .querySelector("#twitter-thread-btn")
  .addEventListener("click", ({ target }) => {
    target.classList.add("hidden");
    document
      .querySelector(".container.twitter-thread .loading-image")
      .classList.remove("hidden");

    Tabs.sendMessageToCurrentTab({ action: types.GET_THREAD_TWEETS });
  });

document.querySelectorAll(".llm_engine_select").forEach((element) => {
  element.addEventListener("click", ({ target }) => {
    const engine = target.value;

    Storage.set({ engine });
  });
});

document.querySelectorAll(".copy-clipboard-btn").forEach((btn) => {
  btn.addEventListener("click", async ({ target }) => {
    const dataType = target.getAttribute("data-type");

    const promptText = document.querySelector(
      `.container.${dataType} .prompt-text`,
    ).value;

    await navigator.clipboard.writeText(promptText);
  });
});

document.querySelectorAll(".process-llm-btn").forEach((btn) =>
  btn.addEventListener("click", ({ target }) => {
    const dataType = target.getAttribute("data-type");

    const promptText = document.querySelector(
      `.container.${dataType} .prompt-text`,
    ).value;

    Messages.sendPromptToLLM(promptText);
  }),
);

Messages.addListener((message) => {
  switch (message.action) {
    case types.GET_POPUP_PROMPT:
      const { prompt } = message;
      switch (message.dataType) {
        case "youtube":
          document
            .querySelector(".container.youtube .loading-image")
            .classList.add("hidden");

          document
            .querySelector(".container.youtube .prompt-container")
            .classList.remove("hidden");

          document.querySelector(".container.youtube .prompt-text").value =
            `${prompt.title}\n\n\`\`\`${prompt.content}\`\`\`\n\n${prompt.ending}`;
          break;

        case "twitter":
          document
            .querySelector(".container.twitter .loading-image")
            .classList.add("hidden");

          document
            .querySelector(".container.twitter .prompt-container")
            .classList.remove("hidden");

          document.querySelector(".container.twitter .prompt-text").value =
            `${prompt.title}\n\n${prompt.content}\n\n${prompt.ending}`;
          break;

        case "twitter-thread":
          document
            .querySelector(".container.twitter-thread .loading-image")
            .classList.add("hidden");

          document
            .querySelector(".container.twitter-thread .prompt-container")
            .classList.remove("hidden");

          document.querySelector(
            ".container.twitter-thread .prompt-text",
          ).value = `${prompt.title}\n\n${prompt.content}\n\n${prompt.ending}`;
          break;

        case "webpage":
          document
            .querySelector(".container.normal .loading-image")
            .classList.add("hidden");

          document
            .querySelector(".container.normal .prompt-container")
            .classList.remove("hidden");

          document.querySelector(".container.normal .prompt-text").value =
            `${prompt.title}\n\n${prompt.content}\n\n${prompt.ending}`;
          break;
      }
      break;
  }
});

initPopup();
