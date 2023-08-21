import YouTubeClient from "./services/youtube/client";

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
