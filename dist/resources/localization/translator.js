"use strict";

require("core-js/modules/es.weak-map.js");
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
var _translation0 = _interopRequireDefault(require("./locales/zh/translation.json"));
var _translation1 = _interopRequireDefault(require("./locales/zh-tw/translation.json"));
var _translation10 = _interopRequireDefault(require("./locales/sv/translation.json"));
var _translation11 = _interopRequireDefault(require("./locales/lt/translation.json"));
var _translation12 = _interopRequireDefault(require("./locales/hu/translation.json"));
var _Translator;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
  zh: _translation0.default,
  "zh-tw": _translation1.default,
  sv: _translation10.default,
  lt: _translation11.default,
  hu: _translation12.default
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
_Translator = Translator;
_defineProperty(Translator, "key", enums.CONSTANTS["LOCALE"]);
_defineProperty(Translator, "rtlLanguages", ["ar"]);
_defineProperty(Translator, "defaultLanguage", "en");
_defineProperty(Translator, "getLanguage", () => {
  return localStorage.getItem(_Translator.key);
});
_defineProperty(Translator, "setLanguage", language => {
  const item = _Translator.key;
  localStorage.setItem(item, language);
});
_defineProperty(Translator, "getBrowserLanguage", () => navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage);
_defineProperty(Translator, "getDefaultLanguage", () => {
  //get the language from localstorage
  const savedLanguage = _Translator.getLanguage();

  //get the language set in the browser
  const browserLanguageCode = _Translator.getBrowserLanguage().toLowerCase();
  let browserLanguage = browserLanguageCode;

  //check if the language set in the browser has hyphen(-), if yes split and take the first element of the array
  if (browserLanguageCode !== "zh-tw" && browserLanguageCode.indexOf("-") !== -1) {
    const browserLanguageArray = browserLanguageCode.split("-");
    browserLanguage = browserLanguageArray[0];
  }

  //if there is language set in localstorage and it is different from browser language, update local storage and return the language code
  if (savedLanguage) {
    if (savedLanguage !== browserLanguage) {
      _Translator.setLanguage(browserLanguage);

      //if the translations are not available, default to en
      return translations.hasOwnProperty(browserLanguage) ? browserLanguage : _Translator.defaultLanguage;
    } else {
      //if the translations are not available, default to en
      return translations.hasOwnProperty(browserLanguage) ? browserLanguage : _Translator.defaultLanguage;
    }
  } else {
    _Translator.setLanguage(browserLanguage);

    //if the translations are not available, default to en
    return translations.hasOwnProperty(browserLanguage) ? browserLanguage : _Translator.defaultLanguage;
  }
});
var _default = exports.default = Translator;