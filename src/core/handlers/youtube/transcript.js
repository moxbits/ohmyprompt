export default class YouTubeTranscriptExtractor {
  constructor(videoURL) {
    this.videoURL = videoURL;
  }

  async getTranscript() {
    const langOption = await this.__getLangOptionsWithLink();
    const rawTranscript = await this.__getRawTranscript(langOption[0].link);
    return rawTranscript.map((i) => i.text).join(" ");
  }

  async __getLangOptionsWithLink() {
    // Get a transcript URL
    const videoPageResponse = await fetch(this.videoURL);

    const videoPageHtml = await videoPageResponse.text();
    const splittedHtml = videoPageHtml.split('"captions":');

    if (splittedHtml.length < 2) {
      return;
    } // No Caption Available

    const captions_json = JSON.parse(
      splittedHtml[1].split(',"videoDetails')[0].replace("\n", "")
    );

    const captionTracks =
      captions_json.playerCaptionsTracklistRenderer.captionTracks;

    const languageOptions = Array.from(captionTracks).map((i) => {
      return i.name.simpleText;
    });

    const first = "English"; // Sort by English first

    languageOptions.sort(function (x, y) {
      return x.includes(first) ? -1 : y.includes(first) ? 1 : 0;
    });

    languageOptions.sort(function (x, y) {
      return x == first ? -1 : y == first ? 1 : 0;
    });

    return Array.from(languageOptions).map((langName, index) => {
      const link = captionTracks.find(
        (i) => i.name.simpleText === langName
      ).baseUrl;

      return {
        language: langName,
        link: link,
      };
    });
  }

  async __getRawTranscript(link) {
    const transcriptPageResponse = await fetch(link); // default 0
    const transcriptPageXml = await transcriptPageResponse.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(transcriptPageXml, "text/xml");
    const textNodes = xmlDoc.documentElement.children;

    return Array.from(textNodes).map((node) => {
      const resultText = node.textContent.replace("&#39;", "'"); // removing the ugly characters

      return {
        start: node.getAttribute("start"),
        duration: node.getAttribute("dur"),
        text: resultText,
      };
    });
  }
}
