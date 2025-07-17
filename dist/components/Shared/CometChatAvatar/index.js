"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAvatar = void 0;
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _theme = require("../../../resources/theme");
var _px = _interopRequireDefault(require("./resources/1px.png"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatAvatar extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "setAvatarImage", () => {
      if (this.props.image.trim().length) {
        this.getImage(this.props.image);
      } else if (Object.keys(this.props.user).length) {
        if (this.props.user.hasOwnProperty("avatar")) {
          const avatarImage = this.props.user.avatar;
          this.getImage(avatarImage);
        } else {
          const uid = this.props.user.uid;
          const char = this.props.user.name.charAt(0).toUpperCase();
          const avatarImage = this.generateAvatar(uid, char);
          this.getImage(avatarImage);
        }
      } else if (Object.keys(this.props.group).length) {
        if (this.props.group.hasOwnProperty("icon")) {
          const avatarImage = this.props.group.icon;
          this.getImage(avatarImage);
        } else {
          const guid = this.props.group.guid;
          const char = this.props.group.name.charAt(0).toUpperCase();
          const avatarImage = this.generateAvatar(guid, char);
          this.getImage(avatarImage);
        }
      }
    });
    _defineProperty(this, "getImage", image => {
      let img = new Image();
      img.src = image;
      img.onload = () => {
        if (this._isMounted) {
          this.setState({
            avatarImage: image
          });
        }
      };
    });
    _defineProperty(this, "generateAvatar", (generator, data) => {
      const stringToColour = function stringToColour(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = "#";
        for (let i = 0; i < 3; i++) {
          let value = hash >> i * 8 & 0xff;
          colour += ("00" + value.toString(16)).substr(-2);
        }
        return colour;
      };
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 200;
      canvas.height = 200;

      // Draw background
      context.fillStyle = stringToColour(generator);
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw text
      context.font = "bold 100px 'Inter', sans-serif";
      context.fillStyle = "white"; //foregroundColor;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(data, canvas.width / 2, canvas.height / 2);
      return canvas.toDataURL("image/png");
    });
    this.imgRef = /*#__PURE__*/_react.default.createRef();
    this._isMounted = false;
    this.state = {
      avatarImage: _px.default
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.setAvatarImage();
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setAvatarImage();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const borderWidth = this.props.borderWidth;
    const borderStyle = this.props.borderStyle;
    const borderColor = this.props.borderColor;
    const cornerRadius = this.props.cornerRadius;
    return /*#__PURE__*/_react.default.createElement("img", {
      src: this.state.avatarImage,
      alt: this.state.avatarImage,
      style: {
        overflow: "hidden",
        display: "inherit",
        width: "100%",
        height: "100%",
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        borderColor: borderColor,
        borderRadius: cornerRadius
      },
      ref: this.imgRef
    });
  }
}

// Specifies the default values for props:
exports.CometChatAvatar = CometChatAvatar;
CometChatAvatar.defaultProps = {
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: _theme.theme.borderColor.primary,
  cornerRadius: "50%",
  theme: _theme.theme,
  image: "",
  user: {},
  group: {}
};
CometChatAvatar.propTypes = {
  borderWidth: _propTypes.default.string,
  borderStyle: _propTypes.default.string,
  borderColor: _propTypes.default.string,
  cornerRadius: _propTypes.default.string,
  image: _propTypes.default.string,
  theme: _propTypes.default.object,
  user: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.shape(_chat.CometChat.User)]),
  group: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.shape(_chat.CometChat.Group)])
};