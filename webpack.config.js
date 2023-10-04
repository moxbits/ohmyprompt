const path = require("path");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    chatGPTHandler: "./src/content-scripts/chatGPTHandler.js",
    twitterHandler: "./src/content-scripts/twitterHandler.js",
    youtubeHandler: "./src/content-scripts/youtubeHandler.js",
    pageHandler: "./src/content-scripts/webpageHandler.js",
    background: "./src/background.js",
    popup: "./src/popup.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};
