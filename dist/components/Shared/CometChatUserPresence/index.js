"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserPresence = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../util/CometChatContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CometChatUserPresence = props => {
  const context = _react.default.useContext(_CometChatContext.CometChatContext);
  const [presence, setPresence] = _react.default.useState(false);
  const togglePresence = () => {
    context.FeatureRestriction.isUserPresenceEnabled().then(response => {
      if (response !== presence) {
        setPresence(response);
      }
    }).catch(error => {
      if (presence !== false) {
        setPresence(false);
      }
    });
  };
  _react.default.useEffect(togglePresence);

  //if user presence feature is disabled
  if (presence === false) {
    return null;
  }
  const borderWidth = props.borderWidth;
  const borderColor = props.borderColor;
  const cornerRadius = props.cornerRadius;
  const getStyle = () => ({
    borderWidth: borderWidth,
    borderStyle: "solid",
    borderColor: borderColor,
    borderRadius: cornerRadius
  });
  const backgroundColor = props.status === "online" || props.status === "available" ? "#3BDF2F" : "#C4C4C4";
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    as: "span",
    width: "9px",
    height: "9px",
    top: "-12px",
    float: "right",
    position: "relative",
    backgroundColor: backgroundColor,
    borderWidth: borderWidth,
    borderStyle: "solid",
    borderColor: borderColor,
    borderRadius: cornerRadius,
    className: "presence"
  });
};

// Specifies the default values for props:
exports.CometChatUserPresence = CometChatUserPresence;
CometChatUserPresence.defaultProps = {
  borderWidth: "1px",
  borderColor: "#eaeaea",
  cornerRadius: "50%"
};
CometChatUserPresence.propTypes = {
  borderWidth: _propTypes.default.string,
  borderColor: _propTypes.default.string,
  cornerRadius: _propTypes.default.string
};