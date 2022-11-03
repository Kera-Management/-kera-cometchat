"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatImageViewer = void 0;
require("core-js/modules/web.dom.iterable.js");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _style = require("./style");
var _ring = _interopRequireDefault(require("./resources/ring.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/** @jsxRuntime classic */
/** @jsx jsx */

const CometChatImageViewer = props => {
  const context = (0, _react.useContext)(_CometChatContext.CometChatContext);
  const [image, setImage] = _react.default.useState(null);
  let img = new Image();
  img.src = props.message.data.url;
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