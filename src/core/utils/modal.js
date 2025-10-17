import Messages from "../browser-messages";
import Storage from "../browser-storage";

import modalContent from "../../../views/modal/component.html?raw";
import sharedStyles from "../../../views/shared.css?raw";
import modalStyles from "../../../views/modal/styles.css?raw";

export default class Modal {
  constructor(preModal = "", options = {}) {
    this.preModalContent = preModal;
    if (options.events) this.initCustomEvents = options.events;

    this.modal = document.createElement("div");
    this.basePrompt = "";

    this.modal.id = "ohmychat-prompt-modal";

    if (preModal) this.renderPreModal();
    else this.renderModal();
  }

  renderPreModal() {
    this.modal.innerHTML = `${this.preModalContent}<style>${sharedStyles}${modalStyles}</style>`;
  }

  renderModal() {
    this.modal.innerHTML = `${modalContent}<style>${sharedStyles}${modalStyles}</style>`;
  }

  setPrompt(prompt) {
    this.basePrompt = this.__generatePromptString(prompt);
  }

  getPrompt() {
    return document.querySelector("#ohmychat-prompt-modal .prompt-text").value;
  }

  show() {
    document.body.appendChild(this.modal);

    if (!this.preModalContent) {
      document.querySelector("#ohmychat-prompt-modal .prompt-text").value =
        this.basePrompt;

      this.__selectActiveEngine();
    }

    this.__addEvents();
    Messages.send({ action: types.DISABLE_CSP_BYPASS });
  }

  __generatePromptString({ content, template }) {
    return template.replace("{{%prompt-text%}}", content);
  }

  __addEvents() {
    document
      .querySelector("#ohmychat-prompt-modal .close-prompt-container")
      .addEventListener("click", () => this.close());

    if (!this.preModalContent) {
      document
        .querySelector("#ohmychat-prompt-modal .copy-clipboard-btn")
        .addEventListener("click", () => this.__copyToClipboard());

      document
        .querySelector("#ohmychat-prompt-modal .process-llm-btn")
        .addEventListener("click", () => this.__processPrompt());

      document
        .querySelector(".llm_engine_select")
        .addEventListener("click", ({ target }) => {
          const engine = target.value;
          Storage.set({ engine });
        });
    }

    if (this.initCustomEvents) this.initCustomEvents();
  }

  __selectActiveEngine() {
    Storage.get("engine", (data) => {
      const llmSelect = document.querySelector(".llm_engine_select");

      switch (data.engine) {
        case "chatgpt":
          llmSelect.selectedIndex = 0;
          break;
        case "claude":
          llmSelect.selectedIndex = 1;
          break;
        case "duck-ai":
          llmSelect.selectedIndex = 2;
          break;
        case "hugging-chat":
          llmSelect.selectedIndex = 3;
          break;
        case "gemini":
          llmSelect.selectedIndex = 4;
          break;
        case "poe":
          llmSelect.selectedIndex = 5;
          break;
      }
    });
  }

  __copyToClipboard() {
    navigator.clipboard.writeText(this.getPrompt());
  }

  __processPrompt() {
    Messages.sendPromptToBackground(this.getPrompt());
  }

  close() {
    this.modal.remove();
  }
}
