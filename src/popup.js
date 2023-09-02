import YouTubeClient from "./services/youtube/client";
import { messages } from "./utils/types";

const testBtn = document.querySelector("#test-btn");

testBtn.addEventListener("click", () => {
  // const prompt = "Hello There!";

  // chrome.runtime.sendMessage({ message: "newPrompt", prompt }, () => {
  //   chrome.tabs.create({ url: "https://chat.openai.com" });
  // });

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];

    if (activeTab) {
      const currentUrl = activeTab.url;
      const client = new YouTubeClient(currentUrl);
      const videoTranscript = await client.getCurrentVideoTranscript();
      console.log(videoTranscript);
    }
  });
});

document.querySelector("#yt-test-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: messages.SUMMARIZE_YOUTUBE_VIDEO,
    });
  });
});

document.querySelector("#page-test-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: messages.SUMMARIZE_WEBPAGE_CONTENT,
    });
  });
});
