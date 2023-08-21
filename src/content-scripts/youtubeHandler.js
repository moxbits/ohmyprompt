// this will be added to youtube pages in chrome tabs

import YouTubeClient from "../services/youtube/client";
import { Messages } from "../utils/types";

async function startYouTubeHandler() {
  const videoId = "";
  const client = new YouTubeClient(videoId);
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === Messages.GET_YOUTUBE_TRANSCRIPT) {
    // Handle the message received from the background script
    console.log(
      "Received message from background in content script:",
      message.message
    );

    startYouTubeHandler();
  }
});
