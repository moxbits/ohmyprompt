import YouTubeTranscriptExtractor from "./transcript";

export default class YouTubeClient {
  constructor(videoURL) {
    this.transcriptFetcher = new YouTubeTranscriptExtractor(videoURL);
  }

  async getCurrentVideoTranscript() {
    return this.transcriptFetcher.getTranscript();
  }
}
