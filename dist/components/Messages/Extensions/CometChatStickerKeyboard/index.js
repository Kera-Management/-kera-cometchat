"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatStickerKeyboard = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatStickerKeyboard extends _react.default.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "getStickers", () => {
      _chat.CometChat.callExtension("stickers", "GET", "v1/fetch", null).then(stickers => {
        // Stickers received
        let activeStickerSet = null;
        const customStickers = stickers.hasOwnProperty("customStickers") ? stickers["customStickers"] : [];
        const defaultStickers = stickers.hasOwnProperty("defaultStickers") ? stickers["defaultStickers"] : [];
        defaultStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });
        customStickers.sort(function (a, b) {
          return a.stickerSetOrder - b.stickerSetOrder;
        });
        const stickerList = [...defaultStickers, ...customStickers];
        if (stickerList.length === 0) {
          this.decoratorMessage = _translator.default.translate("NO_STICKERS_FOUND", this.context.language);
        }
        const stickerSet = stickerList.reduce((r, sticker, index) => {
          const {
            stickerSetName
          } = sticker;
          if (index === 0) {
            activeStickerSet = stickerSetName;
          }
          r[stickerSetName] = [...(r[stickerSetName] || []), _objectSpread({}, sticker)];
          return r;
        }, {});
        let activeStickerList = [];
        if (Object.keys(stickerSet).length) {
          Object.keys(stickerSet).forEach(key => {
            stickerSet[key].sort(function (a, b) {
              return a.stickerOrder - b.stickerOrder;
            });
          });
          activeStickerList = stickerSet[activeStickerSet];
        }
        this.setState({
          stickerlist: stickerList,
          stickerset: stickerSet,
          activestickerlist: activeStickerList,
          activestickerset: activeStickerSet
        });
      }).catch(error => {
        this.decoratorMessage = _translator.default.translate("SOMETHING_WRONG", this.context.language);
        this.setState({
          activestickerlist: [],
          stickerset: {}
        });
      });
    });
    _defineProperty(this, "sendStickerMessage", stickerItem => {
      this.props.actionGenerated(enums.ACTIONS["SEND_STICKER"], stickerItem);
    });
    _defineProperty(this, "onStickerSetClicked", sectionItem => {
      this.setState({
        activestickerlist: []
      }, () => {
        const stickerSet = _objectSpread({}, this.state.stickerset);
        const activeStickerList = stickerSet[sectionItem];
        this.setState({
          activestickerset: sectionItem,
          activestickerlist: activeStickerList
        });
      });
    });
    _defineProperty(this, "closeStickerKeyboard", () => {
      this.props.actionGenerated(enums.ACTIONS["CLOSE_STICKER_KEYBOARD"]);
    });
    this.decoratorMessage = _translator.default.translate("LOADING", context.language);
    this.state = {
      stickerlist: [],
      stickerset: {},
      activestickerlist: [],
      activestickerset: null
    };
  }
  componentDidMount() {
    this.getStickers();
  }
  render() {
    let messageContainer = null;
    if (this.state.activestickerlist.length === 0) {
      messageContainer = (0, _react2.jsx)("div", {
        css: (0, _style.stickerMsgStyle)(),
        className: "stickers__decorator-message"
      }, (0, _react2.jsx)("p", {
        css: (0, _style.stickerMsgTxtStyle)(this.context),
        className: "decorator-message"
      }, this.decoratorMessage));
    }
    let stickers = null;
    if (Object.keys(this.state.stickerset).length) {
      const sectionItems = Object.keys(this.state.stickerset).map((sectionItem, key) => {
        const stickerSetThumbnail = this.state.stickerset[sectionItem][0]["stickerUrl"];
        return (0, _react2.jsx)("div", {
          key: key,
          className: "stickers__sectionitem",
          css: (0, _style.sectionListItemStyle)(),
          onClick: () => this.onStickerSetClicked(sectionItem)
        }, (0, _react2.jsx)("img", {
          src: stickerSetThumbnail,
          alt: sectionItem
        }));
      });
      let activeStickerList = [];
      if (this.state.activestickerlist.length) {
        const stickerList = [...this.state.activestickerlist];
        activeStickerList = stickerList.map((stickerItem, key) => {
          return (0, _react2.jsx)("div", {
            key: key,
            css: (0, _style.stickerItemStyle)(this.context),
            onClick: () => this.sendStickerMessage(stickerItem),
            className: "stickers__listitem"
          }, (0, _react2.jsx)("img", {
            src: stickerItem.stickerUrl,
            alt: stickerItem.stickerName
          }));
        });
      }
      stickers = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
        css: (0, _style.stickerCloseStyle)(_close.default, this.context),
        className: "stickers__close",
        onClick: this.closeStickerKeyboard
      }), (0, _react2.jsx)("div", {
        css: (0, _style.stickerListStyle)(this.props),
        className: "stickers__list"
      }, activeStickerList), (0, _react2.jsx)("div", {
        css: (0, _style.stickerSectionListStyle)(this.context),
        className: "stickers__sections"
      }, sectionItems));
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.stickerWrapperStyle)(this.context, _react2.keyframes),
      className: "stickers"
    }, messageContainer, stickers);
  }
}

// Specifies the default values for props:
exports.CometChatStickerKeyboard = CometChatStickerKeyboard;
_defineProperty(CometChatStickerKeyboard, "contextType", _CometChatContext.CometChatContext);
CometChatStickerKeyboard.defaultProps = {
  theme: _theme.theme
};
CometChatStickerKeyboard.propTypes = {
  theme: _propTypes.default.object
};