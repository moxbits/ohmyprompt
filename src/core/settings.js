import Storage from "./browser-storage";

document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings on page load
  Storage.get(
    [
      "engine",
      "youtubePrompt",
      "twitterPrompt",
      "threadPrompt",
      "webpagePrompt",
      "selectionPrompt",
      "shouldCopyToClipboard",
    ],
    ({
      engine,
      youtubePrompt,
      twitterPrompt,
      threadPrompt,
      webpagePrompt,
      selectionPrompt,
      shouldCopyToClipboard,
    }) => {
      document.getElementById("engine-select").value = engine;
      document.getElementById("youtube-prompt").value = youtubePrompt;
      document.getElementById("twitter-prompt").value = twitterPrompt;
      document.getElementById("thread-prompt").value = threadPrompt;
      document.getElementById("webpage-prompt").value = webpagePrompt;
      document.getElementById("selection-prompt").value = selectionPrompt;
      document.getElementById("copy-clipboard-check").checked =
        shouldCopyToClipboard;
    },
  );

  // Save settings
  document.getElementById("save-button").addEventListener("click", function () {
    const engine = document.getElementById("engine-select").value;
    const youtubePrompt = document.getElementById("youtube-prompt").value;
    const twitterPrompt = document.getElementById("twitter-prompt").value;
    const threadPrompt = document.getElementById("thread-prompt").value;
    const webpagePrompt = document.getElementById("webpage-prompt").value;
    const selectionPrompt = document.getElementById("selection-prompt").value;
    const shouldCopyToClipboard = document.getElementById(
      "copy-clipboard-check",
    ).checked;

    Storage.set({
      engine,
      youtubePrompt,
      twitterPrompt,
      threadPrompt,
      webpagePrompt,
      selectionPrompt,
      shouldCopyToClipboard,
    });
  });

  // Reset settings
  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
      document.getElementById("engine-select").value = Storage.defaults.engine;

      document.getElementById("youtube-prompt").value =
        Storage.defaults.youtubePrompt;

      document.getElementById("twitter-prompt").value =
        Storage.defaults.twitterPrompt;

      document.getElementById("thread-prompt").value =
        Storage.defaults.threadPrompt;

      document.getElementById("webpage-prompt").value =
        Storage.defaults.webpagePrompt;

      document.getElementById("selection-prompt").value =
        Storage.defaults.selectionPrompt;

      document.getElementById("copy-clipboard-check").checked =
        Storage.defaults.shouldCopyToClipboard;

      Storage.set({
        engine: Storage.defaults.engine,
        youtubePrompt: Storage.defaults.youtubePrompt,
        twitterPrompt: Storage.defaults.twitterPrompt,
        threadPrompt: Storage.defaults.threadPrompt,
        webpagePrompt: Storage.defaults.webpagePrompt,
        selectionPrompt: Storage.defaults.selectionPrompt,
        shouldCopyToClipboard: Storage.defaults.shouldCopyToClipboard,
      });
    });
});
