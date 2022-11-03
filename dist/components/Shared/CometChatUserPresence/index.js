"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserPresence = void 0;
require("core-js/modules/web.dom.iterable.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CometChatContext = require("../../../util/CometChatContext");
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

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
  return (0, _react2.jsx)("span", {
    css: (0, _style.presenceStyle)(props),
    className: "presence",
    style: getStyle()
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