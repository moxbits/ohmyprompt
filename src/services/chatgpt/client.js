export default class ChatGPTClient {
  constructor() {}

  sendMessage(text) {
    const textarea = document.querySelector("textarea");

    textarea.value = text;

    const inputEvent = new Event("input", { bubbles: true });
    textarea.dispatchEvent(inputEvent);

    setTimeout(() => {
      const submitBtn = [...document.querySelectorAll("button")].at(-2);
      submitBtn.click();
    }, 1000);
  }
}
