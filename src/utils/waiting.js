import { waitUntil } from "./time";

export default class WaitingModal {
  constructor(message, length) {
    this.__currentIndex = 0;
    this.__progressLength = length;
    this.__progressMessage = message;
    this.__generateBaseHTMLContent();
  }

  async showLoadingPopup() {
    this.__injectContentToCurrentDocument();
    await waitUntil(() => document.querySelector("#loading-progress-text"));
  }

  closeLoadingPopup() {
    document.querySelector("#ohmychat-loading-modal").remove();
  }

  increaseIndexProgress() {
    this.__currentIndex++;
    document.querySelector(
      "#loading-progress-text",
    ).innerText = `(${this.__currentIndex}/${this.__progressLength})`;
  }

  __injectContentToCurrentDocument() {
    const endingDiv = document.createElement("div");
    endingDiv.innerHTML = this.__baseHTMLContent;
    document.body.appendChild(endingDiv);
  }

  __generateBaseHTMLContent() {
    this.__baseHTMLContent = `
      <div id="ohmychat-loading-modal">
        <style>
          #ohmychat-loading-modal {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999999999;
            background-color: #000000e3;
          }

          .loading-message-box {
            color: white;
            font-family: sans-serif;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        </style>

        <div class="loading-message-box">
          <p>${this.__progressMessage}</p>
          <p id="loading-progress-text">(${this.__currentIndex}/${this.__progressLength})</p>
          <p>Please Wait...</p>
        </div>
      </div>
    `;
  }
}
