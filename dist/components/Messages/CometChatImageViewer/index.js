"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatImageViewer = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var _ring = _interopRequireDefault(require("./resources/ring.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Shared.CometChatBackdrop, {
    show: true,
    clicked: props.close
  }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    onClick: props.close,
    className: "image__wrapper",
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    width: "100%",
    height: image ? "auto" : "100%",
    padding: "1.8% 2.3%",
    zIndex: "9999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bg: "white",
    cursor: "pointer",
    sx: {
      background: "url(".concat(_close.default, ") no-repeat 99% 0.8% #fff"),
      ["@media ".concat(context.theme.breakPoints[1], ", ").concat(context.theme.breakPoints[2])]: {
        height: "100%"
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_react2.Image, {
    src: imageIcon,
    alt: imageIcon,
    objectFit: "contain",
    width: !image ? "24px" : undefined,
    height: !image ? "24px" : undefined,
    maxHeight: image ? "100%" : undefined
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