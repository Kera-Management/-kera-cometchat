"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserProfile = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _notify = _interopRequireDefault(require("./resources/notify.svg"));
var _privacy = _interopRequireDefault(require("./resources/privacy.svg"));
var _chats = _interopRequireDefault(require("./resources/chats.svg"));
var _help = _interopRequireDefault(require("./resources/help.svg"));
var _warning = _interopRequireDefault(require("./resources/warning.svg"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CometChatUserProfile extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.toastRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => {
      this.setState({
        loggedInUser: user
      });
    }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
  }
  render() {
    let userProfile = null;
    if (this.state.loggedInUser) {
      let avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.state.loggedInUser
      });
      userProfile = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "userinfo__header",
        padding: "16px",
        position: "relative",
        borderBottom: "1px solid ".concat(this.props.theme.borderColor.primary),
        height: "70px",
        display: "flex",
        alignItems: "center"
      }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
        as: "h4",
        className: "header__title",
        margin: "0",
        fontSize: "22px",
        fontWeight: "700",
        lineHeight: "26px"
      }, _translator.default.translate("MORE", this.props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "userinfo__detail",
        padding: "16px",
        flexDirection: "row",
        justifyContent: "left",
        alignItems: "center"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "detail__thumbnail",
        display: "inline-block",
        width: "36px",
        height: "36px",
        flexShrink: "0"
      }, avatar), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "detail__user",
        dir: _translator.default.getDirection(this.props.lang),
        width: "calc(100% - 45px)",
        flexGrow: "1",
        paddingLeft: "16px",
        sx: {
          "&[dir=rtl]": {
            paddingRight: "16px",
            paddingLeft: "0"
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "user__name",
        margin: "0",
        fontSize: "15px",
        fontWeight: "600",
        display: "block",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }, this.state.loggedInUser.name), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        as: "p",
        className: "user__status",
        fontSize: "13px",
        margin: "0",
        color: this.props.theme.color.blue
      }, _translator.default.translate("ONLINE", this.props.lang)))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "userinfo__options",
        height: "calc(100% - 145px)",
        overflowY: "auto",
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        alignItems: "flex-start"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "options__title",
        margin: "5px 0",
        width: "100%",
        fontSize: "12px",
        color: this.props.theme.color.helpText,
        textTransform: "uppercase"
      }, _translator.default.translate("PREFERENCES", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "options_list",
        padding: "10px 0",
        width: "100%",
        fontSize: "15px"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option option-notification",
        width: "100%",
        padding: "16px 16px 16px 36px",
        fontWeight: "600",
        sx: {
          background: "url(".concat(_notify.default, ") left center no-repeat")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option_name",
        width: "100%"
      }, _translator.default.translate("NOTIFICATIONS", this.props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option option-privacy",
        width: "100%",
        padding: "16px 16px 16px 36px",
        fontWeight: "600",
        sx: {
          background: "url(".concat(_privacy.default, ") left center no-repeat")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option_name",
        width: "100%"
      }, _translator.default.translate("PRIVACY_AND_SECURITY", this.props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option option-chats",
        width: "100%",
        padding: "16px 16px 16px 36px",
        fontWeight: "600",
        sx: {
          background: "url(".concat(_chats.default, ") left center no-repeat")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option_name",
        width: "100%"
      }, _translator.default.translate("CHATS", this.props.lang)))), /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "options__title",
        margin: "5px 0",
        width: "100%",
        fontSize: "12px",
        color: this.props.theme.color.helpText,
        textTransform: "uppercase"
      }, _translator.default.translate("OTHER", this.props.lang)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "options_list",
        padding: "10px 0",
        width: "100%",
        fontSize: "15px"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option option-help",
        width: "100%",
        padding: "16px 16px 16px 36px",
        fontWeight: "600",
        sx: {
          background: "url(".concat(_help.default, ") left center no-repeat")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option_name",
        width: "100%"
      }, _translator.default.translate("HELP", this.props.lang))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option option-report",
        width: "100%",
        padding: "16px 16px 16px 36px",
        fontWeight: "600",
        sx: {
          background: "url(".concat(_warning.default, ") left center no-repeat")
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        className: "option_name",
        width: "100%"
      }, _translator.default.translate("REPORT_PROBLEM", this.props.lang))))));
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "userinfo",
      display: "flex",
      flexDirection: "column !important",
      height: "calc(100% - 50px)",
      fontFamily: this.props.theme.fontFamily,
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.props.theme.fontFamily
        }
      }
    }, userProfile, /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }));
  }
}

// Specifies the default values for props:
exports.CometChatUserProfile = CometChatUserProfile;
CometChatUserProfile.defaultProps = {
  lang: _translator.default.getDefaultLanguage(),
  theme: _theme.theme
};
CometChatUserProfile.propTypes = {
  lang: _propTypes.default.string,
  theme: _propTypes.default.object
};