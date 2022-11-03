"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserProfile = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _notify = _interopRequireDefault(require("./resources/notify.svg"));
var _privacy = _interopRequireDefault(require("./resources/privacy.svg"));
var _chats = _interopRequireDefault(require("./resources/chats.svg"));
var _help = _interopRequireDefault(require("./resources/help.svg"));
var _warning = _interopRequireDefault(require("./resources/warning.svg"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/** @jsxRuntime classic */
/** @jsx jsx */

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
      let avatar = (0, _react2.jsx)(_Shared.CometChatAvatar, {
        user: this.state.loggedInUser
      });
      userProfile = (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
        css: (0, _style.headerStyle)(this.props),
        className: "userinfo__header"
      }, (0, _react2.jsx)("h4", {
        css: (0, _style.headerTitleStyle)(),
        className: "header__title"
      }, _translator.default.translate("MORE", this.props.lang))), (0, _react2.jsx)("div", {
        css: (0, _style.detailStyle)(),
        className: "userinfo__detail"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.thumbnailStyle)(),
        className: "detail__thumbnail"
      }, avatar), (0, _react2.jsx)("div", {
        css: (0, _style.userDetailStyle)(),
        className: "detail__user",
        dir: _translator.default.getDirection(this.props.lang)
      }, (0, _react2.jsx)("div", {
        css: (0, _style.userNameStyle)(),
        className: "user__name"
      }, this.state.loggedInUser.name), (0, _react2.jsx)("p", {
        css: (0, _style.userStatusStyle)(this.props),
        className: "user__status"
      }, _translator.default.translate("ONLINE", this.props.lang)))), (0, _react2.jsx)("div", {
        css: (0, _style.optionsStyle)(),
        className: "userinfo__options"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionTitleStyle)(this.props),
        className: "options__title"
      }, _translator.default.translate("PREFERENCES", this.props.lang)), (0, _react2.jsx)("div", {
        css: (0, _style.optionListStyle)(),
        className: "options_list"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionStyle)(_notify.default),
        className: "option option-notification"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionNameStyle)(),
        className: "option_name"
      }, _translator.default.translate("NOTIFICATIONS", this.props.lang))), (0, _react2.jsx)("div", {
        css: (0, _style.optionStyle)(_privacy.default),
        className: "option option-privacy"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionNameStyle)(),
        className: "option_name"
      }, _translator.default.translate("PRIVACY_AND_SECURITY", this.props.lang))), (0, _react2.jsx)("div", {
        css: (0, _style.optionStyle)(_chats.default),
        className: "option option-chats"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionNameStyle)(),
        className: "option_name"
      }, _translator.default.translate("CHATS", this.props.lang)))), (0, _react2.jsx)("div", {
        css: (0, _style.optionTitleStyle)(this.props),
        className: "options__title"
      }, _translator.default.translate("OTHER", this.props.lang)), (0, _react2.jsx)("div", {
        css: (0, _style.optionListStyle)(),
        className: "options_list"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionStyle)(_help.default),
        className: "option option-help"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionNameStyle)(),
        className: "option_name"
      }, _translator.default.translate("HELP", this.props.lang))), (0, _react2.jsx)("div", {
        css: (0, _style.optionStyle)(_warning.default),
        className: "option option-report"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.optionNameStyle)(),
        className: "option_name"
      }, _translator.default.translate("REPORT_PROBLEM", this.props.lang))))));
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.userInfoScreenStyle)(this.props),
      className: "userinfo"
    }, userProfile, (0, _react2.jsx)(_Shared.CometChatToastNotification, {
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