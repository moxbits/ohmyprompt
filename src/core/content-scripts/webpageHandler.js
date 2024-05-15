import Messages from "../browser-messages";
import Storage from "../browser-storage";

import WebPageClient from "../services/webpage/client";
import { types } from "../utils/types";

Messages.addListener((message) => {
  switch (message.action) {
    case types.GET_WEBPAGE_CONTENT:
      const client = new WebPageClient();
      const pageTitle = client.getPageTitle();
      const pageText = client.getPageAsText();

      Storage.get("webpagePrompt", (data) => {
        const prompt = {
          title: `I want to provide you with content of a webpage.\nWebpage title: ${pageTitle}`,
          content: pageText,
          ending: data.webpagePrompt,
        };

        Messages.send({
          action: types.GET_POPUP_PROMPT,
          dataType: "webpage",
          prompt,
        });
      });
      break;
  }
});
