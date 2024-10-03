const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = ({ browser }) => ({
  entry: {
    [`${browser}/chatGPTHandler`]:
      "./src/core/content-scripts/chatGPTHandler.js",
    [`${browser}/geminiHandler`]: "./src/core/content-scripts/geminiHandler.js",
    [`${browser}/claudeHandler`]: "./src/core/content-scripts/claudeHandler.js",
    [`${browser}/duckAIHandler`]:
      "./src/core/content-scripts/duckAIHandler.js",
    [`${browser}/huggingChatHandler`]:
      "./src/core/content-scripts/huggingChatHandler.js",
    [`${browser}/poeHandler`]: "./src/core/content-scripts/poeHandler.js",
    [`${browser}/twitterHandler`]:
      "./src/core/content-scripts/twitterHandler.js",
    [`${browser}/youtubeHandler`]:
      "./src/core/content-scripts/youtubeHandler.js",
    [`${browser}/background`]: "./src/core/background.js",
    [`${browser}/settings`]: "./src/core/settings.js",
    [`${browser}/popup`]: "./src/core/popup.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "./browser-messages$": `../${browser}/messages`,
      "./browser-storage$": `../${browser}/storage`,
      "./browser-context$": `../${browser}/context`,
      "./browser-tabs$": `../${browser}/tabs`,
      "../browser-messages$": `../../${browser}/messages`,
      "../browser-storage$": `../../${browser}/storage`,
      "../browser-context$": `../../${browser}/context`,
      "../browser-tabs$": `../../${browser}/tabs`,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        type: "asset/source",
      },
      {
        test: /\.html$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: `src/${browser}/manifest.json`,
          to: `${browser}/manifest.json`,
        },
        { from: "views", to: `${browser}/views` },
        { from: "assets", to: `${browser}/assets` },
      ],
    }),
  ],
});
