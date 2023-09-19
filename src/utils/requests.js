const types = {
  NEW_PROMPT: "newPrompt",
  GET_PROMPT: "getPromptForChatGPT",
  GET_YOUTUBE_TRANSCRIPT: "getYouTubeVideoTranscript",
  GET_WEBPAGE_CONTENT: "getWebPageTextContent",
  GET_TWEETS: "getTweetsText",
  GET_TWEETS_WITH_COMMENTS: "getTweetsWithComments",
  GET_SITE_TYPE: "getSiteType",
};

function sendPromptToChatGPT(prompt) {
  chrome.runtime.sendMessage({
    action: types.NEW_PROMPT,
    prompt,
  });
}

export default {
  types,
  sendPromptToChatGPT,
};
