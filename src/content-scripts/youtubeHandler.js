// this will be added to youtube pages in chrome tabs

import YouTubeClient from "../services/youtube/client";
import { messages } from "../utils/types";

async function startYouTubeHandler() {
  const videoURL = "";
  const youtubeClient = new YouTubeClient(videoURL);
  const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

  const prompt = `This is a youtube transcript. Summarize the following but don't omit the details: ${videoTranscript}`;

  chrome.runtime.sendMessage(
    {
      action: messages.NEW_PROMPT,
      prompt,
    },
    () => {
      window.open("https://chat.openai.com", "_blank");
    }
  );
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === messages.SUMMARIZE_YOUTUBE_VIDEO) {
    startYouTubeHandler();
  }
});
