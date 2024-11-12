const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = ({ browser }) => ({
  entry: {
    [`${browser}/chatGPTHandler`]:
      "./src/core/handlers/chatgpt/handler.js",
    [`${browser}/geminiHandler`]: "./src/core/handlers/gemini/handler.js",
    [`${browser}/claudeHandler`]: "./src/core/handlers/claude/handler.js",
    [`${browser}/duckAIHandler`]: "./src/core/handlers/duckAI/handler.js",
    [`${browser}/huggingChatHandler`]:
      "./src/core/handlers/huggingChat/handler.js",
    [`${browser}/poeHandler`]: "./src/core/handlers/poe/handler.js",
    [`${browser}/twitterHandler`]:
      "./src/core/handlers/twitter/handler.js",
    [`${browser}/youtubeHandler`]:
      "./src/core/handlers/youtube/handler.js",
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
      "./browser-csp-bypass$": `../${browser}/csp-bypass`,
      "../browser-messages$": `../../${browser}/messages`,
      "../browser-storage$": `../../${browser}/storage`,
      "../browser-context$": `../../${browser}/context`,
      "../browser-tabs$": `../../${browser}/tabs`,
      "../../browser-messages$": `../../../${browser}/messages`,
      "../../browser-storage$": `../../../${browser}/storage`,
      "../../browser-context$": `../../../${browser}/context`,
      "../../browser-tabs$": `../../../${browser}/tabs`,
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
