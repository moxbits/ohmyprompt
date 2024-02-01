import { defaults } from "./utils/storage";

document.addEventListener("DOMContentLoaded", function () {
  // Load saved settings on page load
  chrome.storage.sync.get(
    ["engine", "youtubePrompt", "twitterPrompt", "webpagePrompt"],
    function (result) {
      const settings = result;

      document.getElementById("engine-select").value =
        settings.engine || defaults.engine;

      document.getElementById("youtube-prompt").value =
        settings.youtubePrompt || defaults.youtubePrompt;

      document.getElementById("twitter-prompt").value =
        settings.twitterPrompt || defaults.twitterPrompt;

      document.getElementById("thread-prompt").value =
        settings.threadPrompt || defaults.threadPrompt;

      document.getElementById("webpage-prompt").value =
        settings.webpagePrompt || defaults.webpagePrompt;

      document.getElementById("selection-prompt").value =
        settings.selectionPrompt || defaults.selectionPrompt;
    }
  );

  // Save settings
  document.getElementById("save-button").addEventListener("click", function () {
    const engine = document.getElementById("engine-select").value;

    const youtubePrompt = document.getElementById("youtube-prompt").value;

    const twitterPrompt = document.getElementById("twitter-prompt").value;

    const threadPrompt = document.getElementById("thread-prompt").value;

    const webpagePrompt = document.getElementById("webpage-prompt").value;

    const selectionPrompt = document.getElementById("selection-prompt").value;

    chrome.storage.sync.set(
      {
        engine,
        youtubePrompt,
        twitterPrompt,
        threadPrompt,
        webpagePrompt,
        selectionPrompt,
      },
      function () {
        console.log("Settings saved");
      }
    );
  });

  // Reset settings
  document
    .getElementById("reset-button")
    .addEventListener("click", function () {
      document.getElementById("engine-select").value = defaults.engine;

      document.getElementById("youtube-prompt").value = defaults.youtubePrompt;

      document.getElementById("twitter-prompt").value = defaults.twitterPrompt;

      document.getElementById("thread-prompt").value = defaults.threadPrompt;

      document.getElementById("webpage-prompt").value = defaults.webpagePrompt;

      document.getElementById("selection-prompt").value =
        defaults.selectionPrompt;

      chrome.storage.sync.set(
        {
          engine: defaults.engine,
          youtubePrompt: defaults.youtubePrompt,
          twitterPrompt: defaults.twitterPrompt,
          threadPrompt: defaults.threadPrompt,
          webpagePrompt: defaults.webpagePrompt,
          selectionPrompt: defaults.selectionPrompt,
        },
        function () {
          console.log("Settings reset");
        }
      );
    });
});
