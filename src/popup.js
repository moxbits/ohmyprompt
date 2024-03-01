import requests from "./utils/requests";

function initPopup() {
  getSiteType(showPopupBasedOnSiteType);
  selectActiveEngine();
}

function getSiteType(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;
    if (currentTab && url) {
      if (url.includes("youtube.com")) callback("youtube");
      else if (/https:\/\/twitter\.com\/[^\/]+\/status\/\d+/.test(url))
        callback("twitter-thread");
      else if (url.includes("twitter.com")) callback("twitter");
      else callback("webpage");
    } else callback("about");
  });
}

function selectActiveEngine() {
  chrome.storage.sync.get("engine", ({ engine }) => {
    document.querySelectorAll(".llm_engine_select").forEach((item) => {
      switch (engine) {
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

function sendRequestToActiveTab(
  requestMessage,
  extras = null,
  callback = null
) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: requestMessage,
        ...extras,
      },
      callback
    );
  });
}

function hideAllContainers() {
  document.querySelectorAll(".container").forEach((item) => {
    if (!item.classList.contains("hidden")) item.classList.add("hidden");
  });
}

document.querySelectorAll(".settings_icon").forEach((item) => {
  item.addEventListener("click", () => {
    chrome.tabs.create({ url: "views/settings.html" });
  });
});

document
  .querySelector("#youtube-transcript-btn")
  .addEventListener("click", () => {
    sendRequestToActiveTab(requests.types.GET_YOUTUBE_TRANSCRIPT);
  });

document.querySelector("#webpage-content-btn").addEventListener("click", () => {
  sendRequestToActiveTab(requests.types.GET_WEBPAGE_CONTENT);
});

document.querySelector("#twitter-tweets-btn").addEventListener("click", () => {
  const tweetAmounts = document.querySelector("#tweets-amount").value;
  sendRequestToActiveTab(requests.types.GET_TWEETS, {
    twitterOptions: {
      amount: tweetAmounts,
    },
  });
});

document.querySelector("#twitter-thread-btn").addEventListener("click", () => {
  sendRequestToActiveTab(requests.types.GET_THREAD_TWEETS);
});

document.querySelectorAll(".llm_engine_select").forEach((element) => {
  element.addEventListener("click", ({ target }) => {
    const engine = target.value;
    chrome.storage.sync.set({ engine }, () => {
      if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
      else console.log("Engine set to:", engine);
    });
  });
});

initPopup();
