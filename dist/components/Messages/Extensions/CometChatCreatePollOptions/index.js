"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreatePollOptions = void 0;
var _react = require("react");
var _react2 = require("@emotion/react");
var _CometChatContext = require("../../../../util/CometChatContext");
var _style = require("../CometChatCreatePoll/style");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style2 = require("./style");
var _remove = _interopRequireDefault(require("./resources/remove.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatCreatePollOptions = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  return (0, _react2.jsx)("tr", {
    className: "poll__options"
  }, (0, _react2.jsx)("td", null, "\xA0"), (0, _react2.jsx)("td", null, (0, _react2.jsx)("input", {
    autoFocus: true,
    tabIndex: props.tabIndex,
    type: "text",
    autoComplete: "off",
    placeholder: _translator.default.translate("ENTER_YOUR_OPTION", context.language),
    value: props.value,
    onChange: event => props.optionChangeHandler(event, props.option)
  })), (0, _react2.jsx)("td", {
    css: (0, _style.iconWrapperStyle)(),
    className: "option__remove"
  }, (0, _react2.jsx)("span", {
    css: (0, _style2.removeOptionIconStyle)(_remove.default, context),
    onClick: () => props.removePollOption(props.option)
  })));
};
exports.CometChatCreatePollOptions = CometChatCreatePollOptions;