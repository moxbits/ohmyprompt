import Messages from "../browser-messages";
import Storage from "../browser-storage";

import Modal from "../modal";

import WebPageClient from "../services/webpage/client";
import { types } from "../utils/types";

Messages.addListener((message) => {
  switch (message.action) {
    case types.GEN_PROMPT:
      const client = new WebPageClient();
      const pageTitle = client.getPageTitle();
      const pageText = client.getPageAsText();

      Storage.get("webpagePrompt", (data) => {
        const prompt = {
          title: `I want to provide you with content of a webpage.\nWebpage title: ${pageTitle}`,
          content: pageText,
          ending: data.webpagePrompt,
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
