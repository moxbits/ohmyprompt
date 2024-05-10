import Messages from "../browser-messages";
import Storage from "../browser-storage";

import YouTubeClient from "../services/youtube/client";
import { types } from "../utils/types";

async function startYouTubeHandler() {
  const videoURL = window.location.href;
  const youtubeClient = new YouTubeClient(videoURL);

  const videoTitle = document.title;
  const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

  Storage.get("youtubePrompt", (data) => {
    const prompt = {
      title: `I want to provide you content of a youtube video transcript.\nYouTube video title: ${videoTitle}`,
      content: videoTranscript,
      ending: data.youtubePrompt,
      tokenLimit: 20000,
    };

    Messages.sendPromptToLLM(prompt);
  });
}

Messages.addListener((message, _, sendResponse) => {
  switch (message.action) {
    case types.GET_YOUTUBE_TRANSCRIPT:
      startYouTubeHandler();
      break;

    case types.GET_SITE_TYPE:
      sendResponse({ type: "youtube" });
      break;
  }
});
