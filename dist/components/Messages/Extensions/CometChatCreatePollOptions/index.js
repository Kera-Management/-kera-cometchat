"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreatePollOptions = void 0;
var _react = require("react");
var _react2 = require("@chakra-ui/react");
var _CometChatContext = require("../../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _remove = _interopRequireDefault(require("./resources/remove.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatCreatePollOptions = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  return /*#__PURE__*/React.createElement("tr", {
    className: "poll__options"
  }, /*#__PURE__*/React.createElement("td", null, "\xA0"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    tabIndex: props.tabIndex,
    type: "text",
    autoComplete: "off",
    placeholder: _translator.default.translate("ENTER_YOUR_OPTION", context.language),
    value: props.value,
    onChange: event => props.optionChangeHandler(event, props.option)
  })), /*#__PURE__*/React.createElement(_react2.Box, {
    as: "td",
    width: "50px",
    className: "option__remove"
  }, /*#__PURE__*/React.createElement(_react2.Box, {
    as: "span",
    cursor: "pointer",
    display: "block",
    height: "24px",
    width: "24px",
    sx: {
      mask: "url(".concat(_remove.default, ") center center no-repeat"),
      backgroundColor: context.theme.color.red
    },
    onClick: () => props.removePollOption(props.option)
  })));
};
exports.CometChatCreatePollOptions = CometChatCreatePollOptions;