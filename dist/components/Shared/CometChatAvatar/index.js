"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAvatar = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.regexp.to-string.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _px = _interopRequireDefault(require("./resources/1px.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
    const getStyle = () => ({
      borderWidth: borderWidth,
      borderStyle: borderStyle,
      borderColor: borderColor,
      borderRadius: cornerRadius
    });
    return (0, _react2.jsx)("img", {
      src: this.state.avatarImage,
      css: (0, _style.imgStyle)(),
      alt: this.state.avatarImage,
      style: getStyle(),
      ref: el => {
        this.imgRef = el;
      }
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