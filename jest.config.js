/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/src/lib/__mock__/fileMock.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!dateformat).+\\.js$"],
};

module.exports = config;
