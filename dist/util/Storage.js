"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;
require("core-js/modules/es.json.stringify.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class Storage {}
exports.Storage = Storage;
_defineProperty(Storage, "attachChangeDetection", callback => {
  window.addEventListener('storage', callback);
});
_defineProperty(Storage, "detachChangeDetection", callback => {
  window.removeEventListener('storage', callback);
});
_defineProperty(Storage, "setItem", (storageKey, storageValue) => {
  localStorage.setItem(storageKey, JSON.stringify(storageValue));
});
_defineProperty(Storage, "getItem", storageKey => {
  return JSON.parse(localStorage.getItem(storageKey));
});
_defineProperty(Storage, "removeItem", storageKey => {
  localStorage.removeItem(storageKey);
});
_defineProperty(Storage, "clear", () => {});