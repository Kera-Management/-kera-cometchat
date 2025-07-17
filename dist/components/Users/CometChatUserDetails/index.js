"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserDetails = void 0;
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _index = require("../../Shared/CometChatSharedMediaView/index.js");
var _controller = require("./controller");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatUserDetails extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "enableUserPresence", () => {
      this.context.FeatureRestriction.isUserPresenceEnabled().then(response => {
        if (response !== this.state.enableUserPresence && this._isMounted) {
          this.setState({
            enableUserPresence: response
          });
        }
      }).catch(error => {
        if (this.state.enableUserPresence !== false) {
          this.setState({
            enableUserPresence: false
          });
        }
      });
    });
    _defineProperty(this, "updateUser", (key, user) => {
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          {
            if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.context.item.uid === user.uid) {
              //if user presence feature is disabled
              if (this.state.enableUserPresence === false) {
                return false;
              }
              let status = "";
              if (user.status === _chat.CometChat.USER_STATUS.OFFLINE) {
                status = _translator.default.translate("OFFLINE", this.props.lang);
              } else if (user.status === _chat.CometChat.USER_STATUS.ONLINE) {
                status = _translator.default.translate("ONLINE", this.props.lang);
              }
              this.setState({
                status: status
              });
            }
            break;
          }
        default:
          break;
      }
    });
    _defineProperty(this, "setStatusForUser", () => {
      let status = null;
      if (this.context.item.status === _chat.CometChat.USER_STATUS.OFFLINE && this.context.item.lastActiveAt) {
        const lastActive = this.context.item.lastActiveAt * 1000;
        const messageDate = (0, _dateformat.default)(lastActive, "dS mmm yyyy, h:MM TT");
        status = "".concat(_translator.default.translate("LAST_ACTIVE_AT", this.props.lang), ": ").concat(messageDate);
      } else if (this.context.item.status === _chat.CometChat.USER_STATUS.OFFLINE) {
        status = _translator.default.translate("OFFLINE", this.props.lang);
      } else if (this.context.item.status === _chat.CometChat.USER_STATUS.ONLINE) {
        status = _translator.default.translate("ONLINE", this.props.lang);
      }
      this.setState({
        status: status
      });
    });
    _defineProperty(this, "enableSharedMedia", () => {
      this.context.FeatureRestriction.isSharedMediaEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSharedMedia && this._isMounted) {
          this.setState({
            enableSharedMedia: response
          });
        }
      }).catch(error => {
        if (this.state.enableSharedMedia !== false && this._isMounted) {
          this.setState({
            enableSharedMedia: false
          });
        }
      });
    });
    _defineProperty(this, "enableBlockUser", () => {
      this.context.FeatureRestriction.isBlockUserEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBlockUser && this._isMounted) {
          this.setState({
            enableBlockUser: response
          });
        }
      }).catch(error => {
        if (this.state.enableBlockUser !== false && this._isMounted) {
          this.setState({
            enableBlockUser: false
          });
        }
      });
    });
    _defineProperty(this, "enableViewProfile", () => {
      this.context.FeatureRestriction.isViewProfileEnabled().then(response => {
        if (response !== this.state.enableViewProfile && this._isMounted) {
          this.setState({
            enableViewProfile: response
          });
        }
      }).catch(error => {
        if (this.state.enableViewProfile !== false && this._isMounted) {
          this.setState({
            enableViewProfile: false
          });
        }
      });
    });
    _defineProperty(this, "blockUser", () => {
      let uid = this.context.item.uid;
      let usersList = [uid];
      _chat.CometChat.blockUsers(usersList).then(response => {
        if (response && response.hasOwnProperty(uid) && response[uid].hasOwnProperty("success") && response[uid]["success"] === true) {
          const newType = _chat.CometChat.ACTION_TYPE.TYPE_USER;
          const newItem = Object.assign({}, this.context.item, {
            blockedByMe: true
          });
          this.context.setTypeAndItem(newType, newItem);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "unblockUser", () => {
      let uid = this.context.item.uid;
      let usersList = [uid];
      _chat.CometChat.unblockUsers(usersList).then(response => {
        if (response && response.hasOwnProperty(uid) && response[uid].hasOwnProperty("success") && response[uid]["success"] === true) {
          const newType = _chat.CometChat.ACTION_TYPE.TYPE_USER;
          const newItem = Object.assign({}, this.context.item, {
            blockedByMe: false
          });
          this.context.setTypeAndItem(newType, newItem);
        } else {
          this.toastRef.setError("SOMETHING_WRONG");
        }
      }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    });
    _defineProperty(this, "viewProfile", () => {
      const profileLink = this.context.item.link;
      window.open(profileLink, "", "fullscreen=yes, scrollbars=auto");
    });
    _defineProperty(this, "closeDetailView", () => {
      this.props.actionGenerated(enums.ACTIONS["CLOSE_USER_DETAIL"]);
    });
    this._isMounted = false;
    this.state = {
      loggedInUser: null,
      status: null,
      enableSharedMedia: false,
      enableBlockUser: false,
      enableViewProfile: false,
      enableUserPresence: false
    };
    this.toastRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => {
      if (this._isMounted) {
        this.setState({
          loggedInUser: user
        });
      }
    }).catch(error => this.toastRef.setError("SOMETHING_WRONG"));
    this._isMounted = true;
    this.toastRef = /*#__PURE__*/_react.default.createRef();
    this.UserDetailManager = new _controller.UserDetailManager();
    this.UserDetailManager.attachListeners(this.updateUser);
    this.setStatusForUser();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableViewProfile();
    this.enableUserPresence();
  }
  componentDidUpdate(prevProps) {
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableViewProfile();
    this.enableUserPresence();
    if (prevProps.lang !== this.props.lang) {
      this.setStatusForUser();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.UserDetailManager.removeListeners();
    this.UserDetailManager = null;
  }
  render() {
    if (this.state.loggedInUser === null) {
      return null;
    }
    let viewProfile = null;
    if (this.state.enableViewProfile === true && this.context.item.hasOwnProperty("link") && this.context.item.link && this.context.item.link.trim().length) {
      viewProfile = /*#__PURE__*/_react.default.createElement(_react2.VStack, {
        margin: "0",
        padding: "16px 16px 0 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        className: "detailpane__section"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "100%",
        className: "section section__viewprofile",
        sx: {
          "> div": {
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "12px"
          },
          ".item__link": {
            color: this.context.theme.color.blue
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
        as: "h6",
        margin: "0",
        width: "100%",
        fontSize: "12px",
        fontWeight: "500",
        lineHeight: "20px",
        color: this.context.theme.color.secondary,
        textTransform: "uppercase",
        className: "section__header"
      }, _translator.default.translate("ACTIONS", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "100%",
        margin: "6px 0",
        className: "section__content"
      }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
        width: "100%",
        className: "content__item"
      }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: "600",
        display: "inline-block",
        color: this.context.theme.color.red,
        cursor: "pointer",
        className: "item__link",
        onClick: this.viewProfile
      }, _translator.default.translate("VIEW_PROFILE", this.context.language))))));
    }
    let blockUserText;
    if (this.context.item.blockedByMe) {
      blockUserText = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: "600",
        display: "inline-block",
        color: this.context.theme.color.red,
        cursor: "pointer",
        className: "item__link",
        onClick: this.unblockUser
      }, _translator.default.translate("UNBLOCK_USER", this.context.language));
    } else {
      blockUserText = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: "600",
        display: "inline-block",
        color: this.context.theme.color.red,
        cursor: "pointer",
        className: "item__link",
        onClick: this.blockUser
      }, _translator.default.translate("BLOCK_USER", this.context.language));
    }
    let sharedmediaView = /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      height: "calc(100% - 255px)",
      width: "100%",
      margin: "0",
      padding: "16px 16px 0 16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      className: "detailpane__section"
    }, /*#__PURE__*/_react.default.createElement(_index.CometChatSharedMediaView, {
      theme: this.props.theme,
      lang: this.context.language
    }));

    //if shared media feature is disabled
    if (this.state.enableSharedMedia === false) {
      sharedmediaView = null;
    }
    const isOnline = this.state.status ? this.state.status.toLowerCase() : "";
    const compareToOnline = _translator.default.translate(_chat.CometChat.USER_STATUS.ONLINE.toUpperCase(), this.context.language).toLowerCase();
    const statusColor = isOnline === compareToOnline ? this.context.theme.color.blue : this.context.theme.color.helpText;
    return /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      boxSizing: "border-box",
      fontFamily: this.context.theme.fontFamily,
      className: "detailpane detailpane--user",
      sx: {
        "*": {
          boxSizing: "border-box",
          fontFamily: this.context.theme.fontFamily
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.HStack, {
      padding: "16px",
      position: "relative",
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "69px",
      className: "detailpane__header"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      cursor: "pointer",
      display: {
        base: "block",
        sm: "block",
        md: "block",
        lg: "none"
      },
      width: "24px",
      height: "24px",
      className: "header__close",
      onClick: this.closeDetailView,
      sx: {
        mask: "url(".concat(_back.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      as: "h4",
      margin: "0",
      fontWeight: "700",
      fontSize: "20px",
      className: "header__title"
    }, _translator.default.translate("DETAILS", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      margin: "0",
      padding: "16px 16px 0 16px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      className: "detailpane__section"
    }, /*#__PURE__*/_react.default.createElement(_react2.HStack, {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      className: "section section__userinfo"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      width: "35px",
      height: "35px",
      display: "inline-block",
      flexShrink: "0",
      margin: "0 16px 0 0",
      className: "user__thumbnail"
    }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
      user: this.context.item
    })), /*#__PURE__*/_react.default.createElement(_react2.VStack, {
      width: "calc(100% - 50px)",
      className: "user__status",
      spacing: 0,
      alignItems: "flex-start"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      as: "h6",
      margin: "0",
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "22px",
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }, this.context.item.name), /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "span",
      width: "calc(100% - 50px)",
      textTransform: "capitalize",
      fontSize: "13px",
      fontWeight: "400",
      lineHeight: "20px",
      color: statusColor
    }, this.state.status)))), /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.lang
    }), viewProfile, sharedmediaView);
  }
}

// Specifies the default values for props:
exports.CometChatUserDetails = CometChatUserDetails;
_defineProperty(CometChatUserDetails, "contextType", _CometChatContext.CometChatContext);
CometChatUserDetails.defaultProps = {
  theme: _theme.theme
};
CometChatUserDetails.propTypes = {
  theme: _propTypes.default.object
};