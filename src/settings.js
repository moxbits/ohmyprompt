const settings = {
  engine: localStorage.getItem("ai-engine"),
  shouldSplit: localStorage.getItem("should-split-text"),
  youtubePrompt: localStorage.getItem("youtube-prompt"),
  twitterThreadPrompt: localStorage.getItem("twitter-thread-prompt"),
  twitterListPrompt: localStorage.getItem("twitter-list-prompt"),
  redditPostsPrompt: localStorage.getItem("reddit-posts-prompt"),
  redditPostPrompt: localStorage.getItem("reddit-post-prompt"),
  webPagePrompt: localStorage.getItem("web-page-prompt"),
  selectionPrompt: localStorage.getItem("selection-prompt"),
};

const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

saveBtn.addEventListener("click", () => {});

cancelBtn.addEventListener("click", () => {});
