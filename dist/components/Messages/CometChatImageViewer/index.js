"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatImageViewer = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _style = require("./style");
var _ring = _interopRequireDefault(require("./resources/ring.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatImageViewer = props => {
  var _props$message;
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const [image, setImage] = _react.default.useState(null);
  let img = new Image();
  img.src = (_props$message = props.message) === null || _props$message === void 0 || (_props$message = _props$message.data) === null || _props$message === void 0 ? void 0 : _props$message.attachments[0].url;
  img.onload = () => {
    setImage(img.src);
  };
  let imageIcon = null;
  if (image) {
    imageIcon = image;
  } else {
    imageIcon = _ring.default;
  }
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
    show: true,
    clicked: props.close
  }), (0, _react2.jsx)("div", {
    css: (0, _style.imageWrapperStyle)(context, _close.default, image),
    onClick: props.close,
    className: "image__wrapper"
  }, (0, _react2.jsx)("img", {
    src: imageIcon,
    css: (0, _style.imgStyle)(image),
    alt: imageIcon
  })));
};

// Specifies the default values for props:
exports.CometChatImageViewer = CometChatImageViewer;
CometChatImageViewer.defaultProps = {
  count: 0,
  close: () => {}
};
CometChatImageViewer.propTypes = {
  show: _propTypes.default.bool,
  close: _propTypes.default.func,
  message: _propTypes.default.object.isRequired
};