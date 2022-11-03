"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatUserDetails = void 0;
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _index = require("../../Shared/CometChatSharedMediaView/index.js");
var _controller = require("./controller");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _style = require("./style");
var _back = _interopRequireDefault(require("./resources/back.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      viewProfile = (0, _react2.jsx)("div", {
        css: (0, _style.sectionStyle)(),
        className: "detailpane__section"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.actionSectionStyle)(this.context),
        className: "section section__viewprofile"
      }, (0, _react2.jsx)("h6", {
        css: (0, _style.sectionHeaderStyle)(this.props),
        className: "section__header"
      }, _translator.default.translate("ACTIONS", this.context.language)), (0, _react2.jsx)("div", {
        css: (0, _style.sectionContentStyle)(),
        className: "section__content"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.contentItemStyle)(),
        className: "content__item"
      }, (0, _react2.jsx)("div", {
        css: (0, _style.itemLinkStyle)(this.context),
        className: "item__link",
        onClick: this.viewProfile
      }, _translator.default.translate("VIEW_PROFILE", this.context.language))))));
    }
    let blockUserText;
    if (this.context.item.blockedByMe) {
      blockUserText = (0, _react2.jsx)("div", {
        css: (0, _style.itemLinkStyle)(this.context),
        className: "item__link",
        onClick: this.unblockUser
      }, _translator.default.translate("UNBLOCK_USER", this.context.language));
    } else {
      blockUserText = (0, _react2.jsx)("div", {
        css: (0, _style.itemLinkStyle)(this.context),
        className: "item__link",
        onClick: this.blockUser
      }, _translator.default.translate("BLOCK_USER", this.context.language));
    }
    let sharedmediaView = (0, _react2.jsx)("div", {
      css: (0, _style.mediaSectionStyle)(),
      className: "detailpane__section"
    }, (0, _react2.jsx)(_index.CometChatSharedMediaView, {
      theme: this.props.theme,
      lang: this.context.language
    }));

    //if shared media feature is disabled
    if (this.state.enableSharedMedia === false) {
      sharedmediaView = null;
    }
    return (0, _react2.jsx)("div", {
      css: (0, _style.userDetailStyle)(this.context),
      className: "detailpane detailpane--user"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerStyle)(this.context),
      className: "detailpane__header"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.headerCloseStyle)(_back.default, this.context),
      className: "header__close",
      onClick: this.closeDetailView
    }), (0, _react2.jsx)("h4", {
      css: (0, _style.headerTitleStyle)(),
      className: "header__title"
    }, _translator.default.translate("DETAILS", this.context.language))), (0, _react2.jsx)("div", {
      css: (0, _style.sectionStyle)(),
      className: "detailpane__section"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.userInfoSectionStyle)(),
      className: "section section__userinfo"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.userThumbnailStyle)(),
      className: "user__thumbnail"
    }, (0, _react2.jsx)(_Shared.CometChatAvatar, {
      user: this.context.item
    })), (0, _react2.jsx)("div", {
      css: (0, _style.userStatusStyle)(),
      className: "user__status"
    }, (0, _react2.jsx)("h6", {
      css: (0, _style.userNameStyle)()
    }, this.context.item.name), (0, _react2.jsx)("span", {
      css: (0, _style.userPresenceStyle)(this.context, this.state)
    }, this.state.status)))), (0, _react2.jsx)(_Shared.CometChatToastNotification, {
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