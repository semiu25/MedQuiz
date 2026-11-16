const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.watchFolders = [__dirname];
config.resolver = config.resolver || {};
config.resolver.blockList = [
  /\.local\/state\/.*/,
  /\.local\/skills\/.*/,
  /\.local\/secondary_skills\/.*/,
  /\.local\/tasks\/.*/,
  /\.git\/.*/,
];

module.exports = config;
