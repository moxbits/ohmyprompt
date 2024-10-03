import Storage from "./browser-storage";

document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings on page load
  Storage.get(
    [
      "engine",
      "youtubePrompt",
      "twitterPrompt",
      "threadPrompt",
      "selectionPrompt",
    ],
    ({
      engine,
      youtubePrompt,
      twitterPrompt,
      threadPrompt,
      selectionPrompt,
    }) => {
      document.getElementById("engine-select").value = engine;
      document.getElementById("youtube-prompt").value = youtubePrompt;
      document.getElementById("twitter-prompt").value = twitterPrompt;
      document.getElementById("thread-prompt").value = threadPrompt;
      document.getElementById("selection-prompt").value = selectionPrompt;
    },
  );

  // Save settings
  document.getElementById("save-button").addEventListener("click", function () {
    const engine = document.getElementById("engine-select").value;
    const youtubePrompt = document.getElementById("youtube-prompt").value;
    const twitterPrompt = document.getElementById("twitter-prompt").value;
    const threadPrompt = document.getElementById("thread-prompt").value;
    const selectionPrompt = document.getElementById("selection-prompt").value;

    Storage.set({
      engine,
      youtubePrompt,
      twitterPrompt,
      threadPrompt,
      selectionPrompt,
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

      document.getElementById("selection-prompt").value =
        Storage.defaults.selectionPrompt;

      Storage.set({
        engine: Storage.defaults.engine,
        youtubePrompt: Storage.defaults.youtubePrompt,
        twitterPrompt: Storage.defaults.twitterPrompt,
        threadPrompt: Storage.defaults.threadPrompt,
        selectionPrompt: Storage.defaults.selectionPrompt,
      });
    });
});
