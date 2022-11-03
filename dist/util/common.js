"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkify = exports.getUnixTimestamp = exports.getTimeStampForLastMessage = exports.getMessageSentTime = exports.getMessageFileMetadata = exports.getMessageDate = exports.countEmojiOccurences = exports.checkMessageForExtensionsData = exports.ID = void 0;
require("core-js/modules/es6.regexp.constructor.js");
require("core-js/modules/es6.regexp.replace.js");
require("core-js/modules/es6.regexp.match.js");
require("core-js/modules/es6.regexp.to-string.js");
require("core-js/modules/es6.regexp.split.js");
var _dateformat = _interopRequireDefault(require("dateformat"));
var _translator = _interopRequireDefault(require("../resources/localization/translator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable no-useless-concat */
/* eslint-disable no-extend-native */

const milliseconds = 1000;
const seconds = 1 * milliseconds;
const minute = 60 * seconds;
const hour = 60 * minute;
const day = 24 * hour;
const wordBoundary = {
  start: "(?:^|:|;|'|\"|,|{|}|\\.|\\s|\\!|\\?|\\(|\\)|\\[|\\]|\\*)",
  end: "(?=$|:|;|'|\"|,|{|}|\\.|\\s|\\!|\\?|\\(|\\)|\\[|\\]|\\*)"
};
const emailPattern = new RegExp(wordBoundary.start + "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}" + wordBoundary.end, 'gi');
const urlPattern = new RegExp(wordBoundary.start + "((https?://|www\\.|pic\\.)[-\\w;/?:@&=+$\\|\\_.!~*\\|'()\\[\\]%#,\u263A]+[\\w/#](\\(\\))?)" + wordBoundary.end, 'gi');
const phoneNumPattern = new RegExp(wordBoundary.start + "(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)" + wordBoundary.end, 'gi');
const linkify = message => {
  let outputStr = message.replace(phoneNumPattern, "<a target='blank' rel='noopener noreferrer' href='tel:$&'>$&</a>");
  outputStr = outputStr.replace(emailPattern, "<a target='blank' rel='noopener noreferrer' href='mailto:$&'>$&</a>");
  const results = outputStr.match(urlPattern);
  results && results.forEach(url => {
    url = url.trim();
    let normalizedURL = url;
    if (!url.startsWith('http')) {
      normalizedURL = "//".concat(url);
    }
    outputStr = outputStr.replace(url, "<a target='blank' rel='noopener noreferrer' href=\"".concat(normalizedURL, "\">").concat(url, "</a>"));
  });
  return outputStr;
};
exports.linkify = linkify;
const checkMessageForExtensionsData = (message, extensionKey) => {
  let output = null;
  if (message.hasOwnProperty("metadata")) {
    const metadata = message.metadata;
    const injectedObject = metadata["@injected"];
    if (injectedObject && injectedObject.hasOwnProperty("extensions")) {
      const extensionsObject = injectedObject["extensions"];
      if (extensionsObject && extensionsObject.hasOwnProperty(extensionKey)) {
        output = extensionsObject[extensionKey];
      }
    }
  }
  return output;
};
exports.checkMessageForExtensionsData = checkMessageForExtensionsData;
const getMessageFileMetadata = (message, metadataKey) => {
  let fileMetadata = null;
  if (message.hasOwnProperty("metadata")) {
    const metadata = message["metadata"];
    if (metadata.hasOwnProperty(metadataKey)) {
      fileMetadata = metadata[metadataKey];
    }
  }
  return fileMetadata;
};
exports.getMessageFileMetadata = getMessageFileMetadata;
const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
exports.ID = ID;
const getUnixTimestamp = () => {
  return Math.round(+new Date() / 1000);
};
exports.getUnixTimestamp = getUnixTimestamp;
const dateDiffInDays = (a, b) => {
  const milliSecondsPerDay = day;

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / milliSecondsPerDay);
};
const getTimeStampForLastMessage = (timestamp, lang) => {
  const timeStampInMilliSeconds = timestamp * 1000;
  const messageTimestamp = new Date(timeStampInMilliSeconds);
  const currentTimestamp = new Date(Date.now());
  const dateDifferenceInDays = dateDiffInDays(messageTimestamp, currentTimestamp);
  if (dateDifferenceInDays < 1) {
    timestamp = (0, _dateformat.default)(messageTimestamp, "shortTime");
  } else if (dateDifferenceInDays < 2) {
    timestamp = _translator.default.translate("YESTERDAY", lang);
  } else if (dateDifferenceInDays < 7) {
    timestamp = (0, _dateformat.default)(messageTimestamp, "dddd");
    timestamp = _translator.default.translate(timestamp, lang);
  } else {
    timestamp = (0, _dateformat.default)(messageTimestamp, "dS mmm");
  }
  return timestamp;
};
exports.getTimeStampForLastMessage = getTimeStampForLastMessage;
const getMessageSentTime = (timestamp, lang) => {
  let oTimestamp = null;
  const messageTimestamp = new Date(timestamp) * 1000;
  oTimestamp = (0, _dateformat.default)(messageTimestamp, "shortTime");
  return oTimestamp;
};
exports.getMessageSentTime = getMessageSentTime;
const getMessageDate = (timestamp, lang) => {
  const timeStampInMilliSeconds = timestamp * 1000;
  const messageTimestamp = new Date(timeStampInMilliSeconds);
  const currentTimestamp = new Date(Date.now());
  const dateDifferenceInDays = dateDiffInDays(messageTimestamp, currentTimestamp);
  if (dateDifferenceInDays < 1) {
    timestamp = _translator.default.translate("TODAY", lang);
  } else if (dateDifferenceInDays < 2) {
    timestamp = _translator.default.translate("YESTERDAY", lang);
  } else if (dateDifferenceInDays < 7) {
    timestamp = (0, _dateformat.default)(messageTimestamp, "dddd");
    timestamp = _translator.default.translate(timestamp, lang);
  } else {
    timestamp = (0, _dateformat.default)(timeStampInMilliSeconds, "dS mmm, yyyy");
  }
  return timestamp;
};
exports.getMessageDate = getMessageDate;
const countEmojiOccurences = (string, word) => {
  if (string.split(word).length - 1 >= 3) {
    return 3;
  } else {
    let content = string;
    content = string.replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g, "");
    if (content.length > 0) {
      return 3;
    } else {
      return string.split(word).length - 1;
    }
  }
};
exports.countEmojiOccurences = countEmojiOccurences;