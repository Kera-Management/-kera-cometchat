"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatThreadedMessageReplyCount = void 0;
require("core-js/modules/web.dom.iterable.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatThreadedMessageReplyCount = props => {
  const context = _react.default.useContext(_CometChatContext.CometChatContext);
  const [reply, setReply] = _react.default.useState(false);
  const toggleReply = () => {
    context.FeatureRestriction.isThreadedMessagesEnabled().then(response => {
      if (response !== reply) {
        setReply(response);
      }
    }).catch(error => {
      if (reply !== false) {
        setReply(false);
      }
    });
  };
  _react.default.useEffect(toggleReply);
  const viewThread = () => {
    props.actionGenerated(enums.ACTIONS["VIEW_THREADED_MESSAGE"], props.message);
  };
  const replyCount = props.message.replyCount;
  const replyText = replyCount === 1 ? "".concat(replyCount, " ").concat(_translator.default.translate("REPLY", context.language)) : "".concat(replyCount, " ").concat(_translator.default.translate("REPLIES", context.language));
  let replies = (0, _react2.jsx)("span", {
    css: (0, _style.replyCountStyle)(context),
    className: "replycount",
    onClick: viewThread
  }, replyText);
  if (props.message.hasOwnProperty("replyCount") === false) {
    replies = null;
  }

  //if threadedchats feature is disabled
  if (reply === false) {
    replies = null;
  }
  return replies;
};

// Specifies the default values for props:
exports.CometChatThreadedMessageReplyCount = CometChatThreadedMessageReplyCount;
CometChatThreadedMessageReplyCount.defaultProps = {
  theme: _theme.theme,
  actionGenerated: () => {}
};
CometChatThreadedMessageReplyCount.propTypes = {
  theme: _propTypes.default.object,
  actionGenerated: _propTypes.default.func.isRequired,
  message: _propTypes.default.object.isRequired
};