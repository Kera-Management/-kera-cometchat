"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderAudioMessageBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("..");
var _Extensions = require("../Extensions");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatSenderAudioMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "getFileData", () => {
      const metadataKey = enums.CONSTANTS["FILE_METADATA"];
      const fileMetadata = (0, _common.getMessageFileMetadata)(this.props.message, metadataKey);
      if (fileMetadata instanceof Blob) {
        return {
          fileName: fileMetadata["name"]
        };
      } else if (this.props.message.data.hasOwnProperty("attachments") && this.props.message.data.attachments.length) {
        var _this$props$message$d, _this$props$message$d2;
        const fileName = (_this$props$message$d = this.props.message.data.attachments[0]) === null || _this$props$message$d === void 0 ? void 0 : _this$props$message$d.name;
        const fileUrl = (_this$props$message$d2 = this.props.message.data.attachments[0]) === null || _this$props$message$d2 === void 0 ? void 0 : _this$props$message$d2.url;
        return {
          fileName,
          fileUrl: fileUrl
        };
      }
    });
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    this.state = {
      isHovering: false,
      fileData: {}
    };
  }
  componentDidMount() {
    const fileData = this.getFileData();
    this.setState({
      fileData: fileData
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering || this.state.fileData !== nextState.fileData) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps) {
    const previousMessageStr = JSON.stringify(prevProps.message);
    const currentMessageStr = JSON.stringify(this.props.message);
    if (previousMessageStr !== currentMessageStr) {
      const fileData = this.getFileData();
      const previousfileData = JSON.stringify(this.state.fileData);
      const currentfileData = JSON.stringify(fileData);
      if (previousfileData !== currentfileData) {
        this.setState({
          fileData: fileData
        });
      }
    }
  }
  render() {
    var _this$state$fileData;
    if (!Object.keys(this.state.fileData).length) {
      return null;
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = /*#__PURE__*/_react.default.createElement(_react2.Flex, {
          className: "message__reaction__wrapper",
          display: "flex",
          alignSelf: "flex-end",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          minHeight: "36px"
        }, /*#__PURE__*/_react.default.createElement(_Extensions.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = /*#__PURE__*/_react.default.createElement(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "sender__message__container message__audio",
      alignSelf: "flex-end",
      marginBottom: "16px",
      paddingLeft: "16px",
      paddingRight: "16px",
      maxWidth: "65%",
      clear: "both",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      flexShrink: "0",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__wrapper",
      width: "auto",
      flex: "1 1",
      alignSelf: "flex-end",
      display: "flex"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "message__audio__wrapper",
      display: "inline-block",
      borderRadius: "12px",
      alignSelf: "flex-end",
      sx: {
        "> audio": {
          maxWidth: "250px",
          display: "inherit",
          outline: "none"
        }
      }
    }, /*#__PURE__*/_react.default.createElement("audio", {
      controls: true,
      src: (_this$state$fileData = this.state.fileData) === null || _this$state$fileData === void 0 ? void 0 : _this$state$fileData.fileUrl
    }))), messageReactions, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "message__info__wrapper",
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      height: "25px",
      padding: "4px 8px"
    }, /*#__PURE__*/_react.default.createElement(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), /*#__PURE__*/_react.default.createElement(_.CometChatReadReceipt, {
      message: this.props.message
    })));
  }
}

// Specifies the default values for props:
exports.CometChatSenderAudioMessageBubble = CometChatSenderAudioMessageBubble;
CometChatSenderAudioMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderAudioMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};