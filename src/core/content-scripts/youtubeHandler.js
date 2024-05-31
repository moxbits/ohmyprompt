import Modal from "../modal";

import Messages from "../browser-messages";
import Storage from "../browser-storage";

import YouTubeClient from "../services/youtube/client";
import { types } from "../utils/types";

Messages.addListener(async (message) => {
  switch (message.action) {
    case types.GEN_PROMPT:
      const videoURL = window.location.href;
      const youtubeClient = new YouTubeClient(videoURL);

      const videoTitle = document.title;
      const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

      Storage.get("youtubePrompt", (data) => {
        const prompt = {
          title: `I want to provide you content of a youtube video transcript.\nYouTube video title: ${videoTitle}`,
          content: videoTranscript,
          ending: data.youtubePrompt,
        };

        const modal = new Modal();
        modal.setPrompt(prompt);
        modal.show();

        Messages.send({
          action: types.MODAL_LOADED,
        });
      });

      break;
  }
});
