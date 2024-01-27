"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
var enums = _interopRequireWildcard(require("../../util/enums.js"));
var _translation = _interopRequireDefault(require("./locales/ar/translation.json"));
var _translation2 = _interopRequireDefault(require("./locales/de/translation.json"));
var _translation3 = _interopRequireDefault(require("./locales/en/translation.json"));
var _translation4 = _interopRequireDefault(require("./locales/es/translation.json"));
var _translation5 = _interopRequireDefault(require("./locales/fr/translation.json"));
var _translation6 = _interopRequireDefault(require("./locales/hi/translation.json"));
var _translation7 = _interopRequireDefault(require("./locales/ms/translation.json"));
var _translation8 = _interopRequireDefault(require("./locales/pt/translation.json"));
var _translation9 = _interopRequireDefault(require("./locales/ru/translation.json"));
var _translation10 = _interopRequireDefault(require("./locales/zh/translation.json"));
var _translation11 = _interopRequireDefault(require("./locales/zh-tw/translation.json"));
var _translation12 = _interopRequireDefault(require("./locales/sv/translation.json"));
var _translation13 = _interopRequireDefault(require("./locales/lt/translation.json"));
var _translation14 = _interopRequireDefault(require("./locales/hu/translation.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// the translations
const translations = {
  ar: _translation.default,
  de: _translation2.default,
  en: _translation3.default,
  es: _translation4.default,
  fr: _translation5.default,
  hi: _translation6.default,
  ms: _translation7.default,
  pt: _translation8.default,
  ru: _translation9.default,
  zh: _translation10.default,
  "zh-tw": _translation11.default,
  sv: _translation12.default,
  lt: _translation13.default,
  hu: _translation14.default
};
class Translator {
  static getDirection(language) {
    return this.rtlLanguages.includes(language) ? "rtl" : "ltr";
  }
  static translate(str, language) {
    if (translations.hasOwnProperty(language)) {
      const languageDb = translations[language];
      if (languageDb.hasOwnProperty(str)) {
        return languageDb[str];
      }
      return str;
    } else {
      const languageDb = translations[this.defaultLanguage];
      if (languageDb.hasOwnProperty(str)) {
        return languageDb[str];
      }
      return str;
    }
  }
}
_defineProperty(Translator, "key", enums.CONSTANTS["LOCALE"]);
_defineProperty(Translator, "rtlLanguages", ["ar"]);
_defineProperty(Translator, "defaultLanguage", "en");
_defineProperty(Translator, "getLanguage", () => {
  return localStorage.getItem(Translator.key);
});
_defineProperty(Translator, "setLanguage", language => {
  const item = Translator.key;
  localStorage.setItem(item, language);
});
_defineProperty(Translator, "getBrowserLanguage", () => navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage);
_defineProperty(Translator, "getDefaultLanguage", () => {
  //get the language from localstorage
  const savedLanguage = Translator.getLanguage();

  //get the language set in the browser
  const browserLanguageCode = Translator.getBrowserLanguage().toLowerCase();
  let browserLanguage = browserLanguageCode;

  //check if the language set in the browser has hyphen(-), if yes split and take the first element of the array
  if (browserLanguageCode !== "zh-tw" && browserLanguageCode.indexOf("-") !== -1) {
    const browserLanguageArray = browserLanguageCode.split("-");
    browserLanguage = browserLanguageArray[0];
  }

  //if there is language set in localstorage and it is different from browser language, update local storage and return the language code
  if (savedLanguage) {
    if (savedLanguage !== browserLanguage) {
      Translator.setLanguage(browserLanguage);

      //if the translations are not available, default to en
      return translations.hasOwnProperty(browserLanguage) ? browserLanguage : Translator.defaultLanguage;
    } else {
      //if the translations are not available, default to en
      return translations.hasOwnProperty(browserLanguage) ? browserLanguage : Translator.defaultLanguage;
    }
  } else {
    Translator.setLanguage(browserLanguage);

    //if the translations are not available, default to en
    return translations.hasOwnProperty(browserLanguage) ? browserLanguage : Translator.defaultLanguage;
  }
});
var _default = Translator;
exports.default = _default;