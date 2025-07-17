"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatStickerKeyboard = void 0;
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.iterator.map.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      messageContainer = /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "stickers__decorator-message",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "35%"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "decorator-message",
        margin: "0",
        height: "30px",
        color: this.context.theme.color.secondary,
        fontSize: "24px!important",
        fontWeight: "600"
      }, this.decoratorMessage));
    }
    let stickers = null;
    if (Object.keys(this.state.stickerset).length) {
      const sectionItems = Object.keys(this.state.stickerset).map((sectionItem, key) => {
        const stickerSetThumbnail = this.state.stickerset[sectionItem][0]["stickerUrl"];
        return /*#__PURE__*/_react.default.createElement(_react2.Box, {
          key: key,
          className: "stickers__sectionitem",
          height: "35px",
          width: "35px",
          cursor: "pointer",
          flexShrink: "0",
          sx: {
            ":not(:first-of-type)": {
              marginLeft: "16px"
            }
          },
          onClick: () => this.onStickerSetClicked(sectionItem)
        }, /*#__PURE__*/_react.default.createElement(_react2.Image, {
          src: stickerSetThumbnail,
          alt: sectionItem
        }));
      });
      let activeStickerList = [];
      if (this.state.activestickerlist.length) {
        const stickerList = [...this.state.activestickerlist];
        activeStickerList = stickerList.map((stickerItem, key) => {
          return /*#__PURE__*/_react.default.createElement(_react2.Box, {
            key: key,
            className: "stickers__listitem",
            minWidth: "50px",
            minHeight: "50px",
            maxWidth: "70px",
            maxHeight: "70px",
            cursor: "pointer",
            flexShrink: "0",
            marginRight: "20px",
            sx: {
              ["@media ".concat(this.context.theme.breakPoints[1], ", ").concat(this.context.theme.breakPoints[2], ", ").concat(this.context.theme.breakPoints[3])]: {
                maxWidth: "70px",
                maxHeight: "70px"
              }
            },
            onClick: () => this.sendStickerMessage(stickerItem)
          }, /*#__PURE__*/_react.default.createElement(_react2.Image, {
            src: stickerItem.stickerUrl,
            alt: stickerItem.stickerName
          }));
        });
      }
      stickers = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "stickers__close",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        alignSelf: "flex-end",
        cursor: "pointer",
        margin: "8px 8px 0 0",
        sx: {
          mask: "url(".concat(_close.default, ") center center no-repeat"),
          backgroundColor: this.context.theme.primaryColor
        },
        onClick: this.closeStickerKeyboard
      }), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "stickers__list",
        height: "calc(100% - 50px)",
        display: "flex",
        overflowX: "hidden",
        overflowY: "auto",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center"
      }, activeStickerList), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "stickers__sections",
        borderTop: "1px solid ".concat(this.context.theme.borderColor.primary),
        backgroundColor: this.context.theme.backgroundColor.silver,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "uppercase",
        overflowX: "auto",
        overflowY: "hidden",
        padding: "10px",
        sx: {
          "::-webkit-scrollbar": {
            background: this.context.theme.backgroundColor.primary
          },
          "::-webkit-scrollbar-thumb": {
            background: this.context.theme.backgroundColor.silver
          }
        }
      }, sectionItems));
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "stickers",
      backgroundColor: this.context.theme.backgroundColor.grey,
      border: "1px solid ".concat(this.context.theme.borderColor.primary),
      borderBottom: "none",
      borderRadius: "10px 10px 0 0",
      height: "215px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      sx: {
        animation: "slideIn 0.5s ease-out",
        "@keyframes slideIn": {
          from: {
            bottom: "-55px"
          },
          to: {
            bottom: "0px"
          }
        }
      }
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