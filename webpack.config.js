const path = require("path");

module.exports = {
  entry: {
    chatGPTHandler: "./src/content-scripts/chatGPTHandler.ts",
    twitterHandler: "./src/content-scripts/twitterHandler.ts",
    redditHandler: "./src/content-scripts/redditHandler.ts",
    youtubeHandler: "./src/content-scripts/youtubeHandler.ts",
    pageHandler: "./src/content-scripts/webpageHandler.ts",
    background: "./src/background.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
