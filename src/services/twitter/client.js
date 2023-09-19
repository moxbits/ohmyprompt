import TweetFetcher from "./fetcher";

export default class TwitterClient {
  constructor() {}

  getPageTweets(amount) {
    return new TweetFetcher(amount).fetchTweets();
  }

  getThreadTweets() {
    return new TweetFetcher().fetchThreadTweets();
  }

  tweetsToString(tweetObjects) {
    return tweetObjects
      .map((tweet) => `${tweet.toString()}\n====\n`)
      .join("\n");
  }
}
