import Modal from "../../utils/modal";

import Messages from "../../browser-messages";
import Storage from "../../browser-storage";

import YouTubeClient from "./client";

import { types } from "../../utils/types";

Messages.addListener(async (message) => {
  switch (message.action) {
    case types.GEN_PROMPT:
      const videoURL = window.location.href;
      const youtubeClient = new YouTubeClient(videoURL);

      const videoTitle = document.title;
      const videoTranscript = await youtubeClient.getCurrentVideoTranscript();

      Storage.get("youtubePrompt", (data) => {
        const prompt = {
          content: `Video title: ${videoTitle}\n${videoTranscript}`,
          template: data.youtubePrompt,
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
