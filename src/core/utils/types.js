import Tabs from "../browser-tabs";

export const types = {
  GEN_PROMPT: "generatePrompt",
  SAVE_PROMPT: "savePrompt",
  GET_PROMPT: "getPromptForLLM",
  GET_TWEETS: "getTweetsText",
  MODAL_LOADED: "modalLoaded",
  BYPASS_CSP: "bypassCSP",
  DISABLE_CSP_BYPASS: "disableBypassCSP",
};

export async function getSiteType() {
  let url = "";

  if (Tabs.isUsable()) {
    const tab = await Tabs.getCurrentTab();
    url = tab.url;
  } else url = window.location.href;

  if (url) {
    if (url.includes("youtube.com")) return "youtube";
    else if (
      /https:\/\/twitter\.com\/[^\/]+\/status\/\d+/.test(url) ||
      /https:\/\/x\.com\/[^\/]+\/status\/\d+/.test(url)
    )
      return "twitter-thread";
    else if (
      url.includes("twitter.com") ||
      url.includes("//x.com") ||
      url.includes("www.x.com")
    )
      return "twitter";
    else return "about";
  } else return "about";
}
