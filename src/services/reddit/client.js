const REDDIT_UI_SELECTORS = {
  POST_SUMMARY: "[data-testid=post-container]",
  POST_TEXT: "[data-testid=post-content]",
  COMMENTS: ".Comment",
};

export default class RedditClient {
  extractFeed(posts = 20) {}

  extractFeedWithDetail(posts = 20) {}

  __getListOfPostSummaryElements() {
    return document.querySelectorAll(REDDIT_UI_SELECTORS.POST_SUMMARY);
  }

  __getElementPostText(element) {
    element.click();
    // wait for page load
    return document.querySelectorAll(REDDIT_UI_SELECTORS.POST_TEXT);
  }

  __getElementPostComments(element) {
    element.click();
    // wait for page load
    return document.querySelectorAll(REDDIT_UI_SELECTORS.COMMENTS);
  }

  __stepBackwardInBrowserHistory() {
    // backward button click
  }

  __convertPostToText(element) {}

  __convertPostSummaryToText(element) {}
}
