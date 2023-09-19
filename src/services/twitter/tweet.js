export default class Tweet {
  constructor(
    author,
    authorId,
    createdAt,
    content,
    likes,
    retweets,
    views,
    htmlElement,
  ) {
    this.__author = author;
    this.__authorId = authorId;
    this.__content = content;
    this.__createdAt = createdAt;
    this.__likes = likes;
    this.__retweets = retweets;
    this.__views = views;
    this.__htmlElement = htmlElement;
    this.__tweetAsString = htmlElement.innerText;
    this.__tweetURL = this.extractURLFromTweetElement();
  }

  static fromHTMLElement(element) {
    const seperatedContent = element.innerText.split("\n");

    const authorName = seperatedContent[0];
    const authorId = seperatedContent[1];
    const createdAt = seperatedContent[3];

    const content = seperatedContent
      .slice(4, seperatedContent.length - 4)
      .join("\n");

    const likes = seperatedContent[seperatedContent.length - 3];
    const retweets = seperatedContent[seperatedContent.length - 2];
    const views = seperatedContent[seperatedContent.length - 1];

    return new Tweet(
      authorName,
      authorId,
      createdAt,
      content,
      likes,
      retweets,
      views,
      element,
    );
  }

  getHTMLElement() {
    return this.__htmlElement;
  }

  isEqualTo(tweet) {
    return (
      tweet.__authorId == this.__authorId && tweet.__content == this.__content
    );
  }

  extractURLFromTweetElement() {
    return this.__htmlElement.querySelectorAll("a")[3].href;
  }

  toString() {
    return `${this.__tweetAsString}\nTweet URL: ${this.__tweetURL}`;
  }
}
