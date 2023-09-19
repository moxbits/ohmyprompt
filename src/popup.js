import requests from "./utils/requests";

function initPopup() {
  getSiteType(showPopupBasedOnSiteType);
}

function getSiteType(callback) {
  sendRequestToActiveTab(requests.types.GET_SITE_TYPE, null, (response) => {
    if (response && response.type) callback(response.type);
    else callback("about");
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
  callback = null,
) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        action: requestMessage,
        ...extras,
      },
      callback,
    );
  });
}

function hideAllContainers() {
  document.querySelectorAll(".container").forEach((item) => {
    if (!item.classList.contains("hidden")) item.classList.add("hidden");
  });
}

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

initPopup();
