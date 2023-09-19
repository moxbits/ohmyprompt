import YouTubeClient from "../services/youtube/client";
import requests from "../utils/requests";

async function startYouTubeHandler() {
  const videoURL = "";
  const youtubeClient = new YouTubeClient(videoURL);

  const videoTitle = document.title;
  const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

  const prompt = {
    title: `I want to provide you content of a youtube video transcript.\nYouTube video title: ${videoTitle}`,
    content: videoTranscript,
    ending:
      "Summarize the youtube video transcript that i provided for you and do not omit the important parts and details of it",
    tokenLimit: 20000,
  };

  requests.sendPromptToChatGPT(prompt);
}

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case requests.types.GET_YOUTUBE_TRANSCRIPT:
      startYouTubeHandler();
      break;

    case requests.types.GET_SITE_TYPE:
      sendResponse({ type: "youtube" });
      break;

    default:
      console.error("ohmychat youtube: invalid request type");
  }
});
