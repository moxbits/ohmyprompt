import Tweet from "./tweet";
import WaitingModal from "../../utils/waiting";

const browserElementSelectors = {
  TWEET: "[data-testid=tweet]",
};

export default class TweetFetcher {
  constructor(amount = 50) {
    this.__amount = amount;
    this.__currentTweets = [];
    this.__collectedTweets = [];
  }

  async fetchThreadTweets() {
    this.__waitModal = new WaitingModal("Fetching Thread Tweets", "-");
    await this.__waitModal.showLoadingPopup();

    const tweetsList = await this.__fetchThreadTweetsList();

    this.__waitModal.closeLoadingPopup();
    return tweetsList;
  }

  async fetchTweets(amount) {
    this.__waitModal = new WaitingModal(
      "Fetching Tweets",
      amount ? amount : this.__amount,
    );

    await this.__waitModal.showLoadingPopup();

    if (amount) this.__amount = amount;
    const tweetsList = await this.__fetchTweetsList();

    this.__waitModal.closeLoadingPopup();
    return tweetsList;
  }

  async __fetchTweetsList() {
    while (this.__collectedTweets.length < this.__amount) {
      await this.__getNewTweets();
    }

    return this.__collectedTweets;
  }

  async __fetchThreadTweetsList() {
    let exitCounter = 0;

    while (exitCounter <= 3) {
      const filteredTweets = this.__filterRepeatedTweets(true);
      if (filteredTweets.length == 0) exitCounter++;

      await this.__getNewTweets();
    }

    return this.__collectedTweets;
  }

  async __getNewTweets() {
    this.__currentTweets = this.__selectCurrentPositionTweets();
    if (this.__currentTweets.length == 0) return;

    this.__collectedTweets = [
      ...this.__collectedTweets,
      ...this.__filterRepeatedTweets(),
    ];

    await this.__loadTweetsByScrollingToLastTweet();
  }

  __selectCurrentPositionTweets() {
    const currentTweetElements = document.querySelectorAll(
      browserElementSelectors.TWEET,
    );

    if (currentTweetElements.length == 0) return [];

    return this.__convertTweetElementsToObjects(currentTweetElements);
  }

  __convertTweetElementsToObjects(currentScrollTweetElements) {
    return [...currentScrollTweetElements].map(Tweet.fromHTMLElement);
  }

  async __loadTweetsByScrollingToLastTweet() {
    this.__lastTweet = this.__currentTweets[this.__currentTweets.length - 1];
    this.__lastTweet.getHTMLElement().scrollIntoView();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  __filterRepeatedTweets(isThread = false) {
    let index = 0;
    const filteredTweets = [];

    if (this.__lastTweet)
      index =
        this.__currentTweets.findIndex((tweet) =>
          tweet.isEqualTo(this.__lastTweet),
        ) + 1;

    while (index < this.__currentTweets.length) {
      const potentialLength =
        this.__collectedTweets.length + filteredTweets.length;

      if (!isThread && potentialLength >= this.__amount) break;

      filteredTweets.push(this.__currentTweets[index++]);

      this.__waitModal.increaseIndexProgress();
    }

    return filteredTweets;
  }
}
