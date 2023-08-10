const testBtn = document.querySelector("#test-btn")!;

testBtn.addEventListener("click", () => {
  const prompt = "Hello There!";

  chrome.runtime.sendMessage({ message: "newPrompt", prompt }, () => {
    chrome.tabs.create({ url: "https://chat.openai.com" });
  });
});
