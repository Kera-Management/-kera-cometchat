"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderFileMessageBubble = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("../");
var _Extensions = require("../Extensions");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _fileUpload = _interopRequireDefault(require("./resources/file-upload.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatSenderFileMessageBubble extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleMouseHover", () => {
      this.setState(this.toggleHoverState);
    });
    _defineProperty(this, "toggleHoverState", state => {
      return {
        isHovering: !state.isHovering
      };
    });
    _defineProperty(this, "getFileData", () => {
      const metadataKey = enums.CONSTANTS["FILE_METADATA"];
      const fileMetadata = (0, _common.getMessageFileMetadata)(this.props.message, metadataKey);
      if (fileMetadata instanceof Blob) {
        return {
          fileName: fileMetadata["name"]
        };
      } else if (this.props.message.data.attachments && typeof this.props.message.data.attachments === "object" && this.props.message.data.attachments.length) {
        var _this$props$message$d, _this$props$message$d2;
        const fileName = (_this$props$message$d = this.props.message.data.attachments[0]) === null || _this$props$message$d === void 0 ? void 0 : _this$props$message$d.name;
        const fileUrl = (_this$props$message$d2 = this.props.message.data.attachments[0]) === null || _this$props$message$d2 === void 0 ? void 0 : _this$props$message$d2.url;
        return {
          fileName,
          fileUrl: fileUrl
        };
      }
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
    if (!Object.keys(this.state.fileData).length) {
      return null;
    }
    let messageReactions = null;
    const reactionsData = (0, _common.checkMessageForExtensionsData)(this.props.message, "reactions");
    if (reactionsData) {
      if (Object.keys(reactionsData).length) {
        messageReactions = (0, _react2.jsx)("div", {
          css: (0, _style.messageReactionsWrapperStyle)(),
          className: "message__reaction__wrapper"
        }, (0, _react2.jsx)(_Extensions.CometChatMessageReactions, {
          message: this.props.message,
          actionGenerated: this.props.actionGenerated
        }));
      }
    }
    let toolTipView = null;
    if (this.state.isHovering) {
      toolTipView = (0, _react2.jsx)(_.CometChatMessageActions, {
        message: this.props.message,
        actionGenerated: this.props.actionGenerated
      });
    }
    let fileMessage = null;
    if (this.state.fileData.hasOwnProperty("fileUrl")) {
      var _this$state$fileData, _this$state$fileData2;
      fileMessage = (0, _react2.jsx)("a", {
        href: (_this$state$fileData = this.state.fileData) === null || _this$state$fileData === void 0 ? void 0 : _this$state$fileData.fileUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "message__file"
      }, (0, _react2.jsx)("i", {
        css: (0, _style.iconStyle)(_fileUpload.default, this.context)
      }), (0, _react2.jsx)("p", null, (_this$state$fileData2 = this.state.fileData) === null || _this$state$fileData2 === void 0 ? void 0 : _this$state$fileData2.fileName));
    } else {
      var _this$state$fileData3;
      fileMessage = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("i", {
        css: (0, _style.iconStyle)(_fileUpload.default, this.context)
      }), (0, _react2.jsx)("p", null, (_this$state$fileData3 = this.state.fileData) === null || _this$state$fileData3 === void 0 ? void 0 : _this$state$fileData3.fileName));
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "sender__message__container message__file",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageFileWrapper)(this.context),
      className: "message__file__wrapper"
    }, (0, _react2.jsx)("div", {
      className: "message__file"
    }, fileMessage))), messageReactions, (0, _react2.jsx)("div", {
      css: (0, _style.messageInfoWrapperStyle)(),
      className: "message__info__wrapper"
    }, (0, _react2.jsx)(_.CometChatThreadedMessageReplyCount, {
      message: this.props.message,
      actionGenerated: this.props.actionGenerated
    }), (0, _react2.jsx)(_.CometChatReadReceipt, {
      message: this.props.message
    })));
  }
}

// Specifies the default values for props:
exports.CometChatSenderFileMessageBubble = CometChatSenderFileMessageBubble;
_defineProperty(CometChatSenderFileMessageBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderFileMessageBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderFileMessageBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};