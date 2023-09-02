// this will be added to youtube pages in chrome tabs

import YouTubeClient from "../services/youtube/client";
import { messages } from "../utils/types";

async function startYouTubeHandler() {
  const videoURL = "";
  const youtubeClient = new YouTubeClient(videoURL);
  const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

  const prompt = {
    content: videoTranscript,
    endMessage:
      "Summarize the youtube video transcript that i provided for you and do not omit the important parts and details of it",
  };

  chrome.runtime.sendMessage(
    {
      action: messages.NEW_PROMPT,
      prompt,
    },
    () => {
      window.open("https://chat.openai.com", "_blank");
    },
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === messages.SUMMARIZE_YOUTUBE_VIDEO) {
    startYouTubeHandler();
  }
});
