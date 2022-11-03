"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatSenderDirectCallBubble = void 0;
require("core-js/modules/es.json.stringify.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ = require("..");
var _Extensions = require("../Extensions");
var _CometChatContext = require("../../../util/CometChatContext");
var _common = require("../../../util/common");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _videoCall = _interopRequireDefault(require("./resources/video-call.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatSenderDirectCallBubble extends _react.default.Component {
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
    this.state = {
      isHovering: false
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const currentMessageStr = JSON.stringify(this.props.message);
    const nextMessageStr = JSON.stringify(nextProps.message);
    if (currentMessageStr !== nextMessageStr || this.state.isHovering !== nextState.isHovering) {
      return true;
    }
    return false;
  }
  render() {
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
    let callMessage = null;
    const joinCallMessage = _translator.default.translate("YOU_ALREADY_ONGOING_CALL", this.context.language);
    if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_SAME_GROUP"]) {
      //ongoing call in same group
      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfDirectCallIsOngoing() === enums.CONSTANTS.CALLS["ONGOING_CALL_DIFF_GROUP"]) {
      //ongoing call in different group

      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else if (this.context.checkIfCallIsOngoing()) {
      //ongoing call

      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        title: joinCallMessage
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    } else {
      callMessage = (0, _react2.jsx)("li", {
        className: "directcall__row",
        onClick: () => this.props.actionGenerated(enums.ACTIONS["JOIN_DIRECT_CALL"], this.props.message)
      }, (0, _react2.jsx)("p", {
        className: "directcall__text"
      }, _translator.default.translate("JOIN", this.context.language)));
    }
    const messageTitle = _translator.default.translate("YOU_INITIATED_GROUP_CALL", this.context.language);
    return (0, _react2.jsx)("div", {
      css: (0, _style.messageContainerStyle)(),
      className: "sender__message__container message__directcall",
      onMouseEnter: this.handleMouseHover,
      onMouseLeave: this.handleMouseHover
    }, toolTipView, (0, _react2.jsx)("div", {
      css: (0, _style.messageWrapperStyle)(),
      className: "message__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtWrapperStyle)(this.context),
      className: "message__directcall__wrapper"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.messageTxtContainerStyle)(),
      className: "message__directcall__container"
    }, (0, _react2.jsx)("i", {
      css: (0, _style.iconStyle)(_videoCall.default, this.context),
      alt: _translator.default.translate("VIDEO_CALL", this.context.language)
    }), (0, _react2.jsx)("p", {
      css: (0, _style.messageTxtStyle)(),
      className: "directcall__title"
    }, messageTitle)), (0, _react2.jsx)("ul", {
      css: (0, _style.messageBtnStyle)(this.context),
      className: "directcall__button"
    }, callMessage))), messageReactions, (0, _react2.jsx)("div", {
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
exports.CometChatSenderDirectCallBubble = CometChatSenderDirectCallBubble;
_defineProperty(CometChatSenderDirectCallBubble, "contextType", _CometChatContext.CometChatContext);
CometChatSenderDirectCallBubble.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatSenderDirectCallBubble.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};