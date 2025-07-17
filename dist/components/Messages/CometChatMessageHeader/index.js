"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatMessageHeader = void 0;
require("core-js/modules/es.parse-int.js");
var _react = _interopRequireDefault(require("react"));
var _dateformat = _interopRequireDefault(require("dateformat"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _phosphorReact = require("phosphor-react");
var _react2 = require("@chakra-ui/react");
var _controller = require("./controller");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _theme = require("../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _menu = _interopRequireDefault(require("./resources/menu.svg"));
var _audioCall = _interopRequireDefault(require("./resources/audio-call.svg"));
var _videoCall = _interopRequireDefault(require("./resources/video-call.svg"));
var _info = _interopRequireDefault(require("./resources/info.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatMessageHeader extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "item", void 0);
    _defineProperty(this, "setStatusForUser", () => {
      let status = "";
      const presence = this.context.item.status === _chat.CometChat.USER_STATUS.ONLINE ? _chat.CometChat.USER_STATUS.ONLINE : _chat.CometChat.USER_STATUS.OFFLINE;
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
        status: status,
        presence: presence
      });
    });
    _defineProperty(this, "setStatusForGroup", () => {
      let membersText = _translator.default.translate("MEMBERS", this.props.lang);
      const status = "".concat(this.context.item.membersCount, " ").concat(membersText);
      this.setState({
        status: status
      });
    });
    _defineProperty(this, "updateHeader", (key, item, groupUser) => {
      var _this$loggedInUser;
      switch (key) {
        case enums.USER_ONLINE:
        case enums.USER_OFFLINE:
          {
            if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.context.item.uid === item.uid) {
              //if user presence feature is disabled
              if (this.state.enableUserPresence === false) {
                return false;
              }
              let status = "";
              if (item.status === _chat.CometChat.USER_STATUS.OFFLINE) {
                status = _translator.default.translate("OFFLINE", this.context.language);
              } else if (item.status === _chat.CometChat.USER_STATUS.ONLINE) {
                status = _translator.default.translate("ONLINE", this.context.language);
              }
              this.setState({
                status: status,
                presence: item.status
              });
            }
            break;
          }
        case enums.GROUP_MEMBER_KICKED:
        case enums.GROUP_MEMBER_BANNED:
        case enums.GROUP_MEMBER_LEFT:
          if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.item.guid === item.guid && ((_this$loggedInUser = this.loggedInUser) === null || _this$loggedInUser === void 0 ? void 0 : _this$loggedInUser.uid) !== (groupUser === null || groupUser === void 0 ? void 0 : groupUser.uid)) {
            let membersCount = parseInt(item.membersCount);
            const status = "".concat(membersCount, " ").concat(_translator.default.translate("MEMBERS", this.context.language));
            this.setState({
              status: status
            });
          }
          break;
        case enums.GROUP_MEMBER_JOINED:
          if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.item.guid === item.guid) {
            let membersCount = parseInt(item.membersCount);
            const status = "".concat(membersCount, " ").concat(_translator.default.translate("MEMBERS", this.context.language));
            this.setState({
              status: status
            });
          }
          break;
        case enums.GROUP_MEMBER_ADDED:
          if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.item.guid === item.guid) {
            let membersCount = parseInt(item.membersCount);
            const status = "".concat(membersCount, " ").concat(_translator.default.translate("MEMBERS", this.context.language));
            this.setState({
              status: status
            });
          }
          break;
        case enums.TYPING_STARTED:
          this.onTypingStarted(item);
          break;
        case enums.TYPING_ENDED:
          this.onTypingEnded(item);
          break;
        default:
          break;
      }
    });
    _defineProperty(this, "onTypingStarted", item => {
      const showTyping = typingText => {
        /**
         * if metadata is available, show live reactions else show typing
         */
        // if (item.hasOwnProperty("metadata") && item.metadata && item.metadata.hasOwnProperty("type") && item.metadata.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {
        // 	this.props.actionGenerated(enums.ACTIONS["SHOW_LIVE_REACTION"], item);
        // } else {

        if (this.state.enableTypingIndicator === true) {
          this.setState({
            typing: typingText
          });
        }
        //}
      };
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.type === item.receiverType && this.context.item.guid === item.receiverId) {
        const typingText = "".concat(item.sender.name, " ").concat(_translator.default.translate("IS_TYPING", this.context.language));
        showTyping(typingText);
      } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.context.type === item.receiverType && this.context.item.uid === item.sender.uid) {
        const typingText = "".concat(_translator.default.translate("TYPING", this.context.language));
        showTyping(typingText);
      }
    });
    _defineProperty(this, "onTypingEnded", item => {
      const endTyping = () => {
        /**
         * if metadata is available, end live reactions else end typing
         */
        // if (item.hasOwnProperty("metadata") && item.metadata && item.metadata.hasOwnProperty("type") && item.metadata.type === enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"]) {
        // 	this.props.actionGenerated(enums.ACTIONS["STOP_LIVE_REACTION"], item);
        // } else {

        if (this.state.enableTypingIndicator === true) {
          this.setState({
            typing: null
          });
        }
        //}
      };
      if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.context.type === item.receiverType && this.context.item.guid === item.receiverId) {
        this.setStatusForGroup();
        endTyping();
      } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && this.context.type === item.receiverType && this.context.item.uid === item.sender.uid) {
        if (this.state.presence === _chat.CometChat.USER_STATUS.ONLINE) {
          this.setState({
            status: _translator.default.translate("ONLINE", this.context.language),
            presence: _chat.CometChat.USER_STATUS.ONLINE
          });
        } else {
          this.setStatusForUser();
        }
        endTyping();
      }
    });
    _defineProperty(this, "toggleTooltip", (event, flag) => {
      const elem = event.target;
      const scrollWidth = elem.scrollWidth;
      const clientWidth = elem.clientWidth;
      if (scrollWidth <= clientWidth) {
        return false;
      }
      if (flag) {
        elem.setAttribute("title", elem.textContent);
      } else {
        elem.removeAttribute("title");
      }
    });
    _defineProperty(this, "resetChat", () => {
      this.context.setItem({});
      this.props.actionGenerated(enums.ACTIONS["TOGGLE_SIDEBAR"]);
    });
    /**
     * if typing indicator feature is disabled
     */
    _defineProperty(this, "enableTypingIndicator", () => {
      this.context.FeatureRestriction.isTypingIndicatorsEnabled().then(response => {
        if (response !== this.state.enableTypingIndicator) {
          this.setState({
            enableTypingIndicator: response
          });
        }
      }).catch(error => {
        if (this.state.enableTypingIndicator !== false) {
          this.setState({
            enableTypingIndicator: false
          });
        }
      });
    });
    _defineProperty(this, "enableGroupVoiceCall", () => {});
    _defineProperty(this, "enableGroupVideoCall", () => {
      this.context.FeatureRestriction.isGroupVideoCallEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableGroupVideoCall) {
          this.setState({
            enableGroupVideoCall: response
          });
        }
      }).catch(error => {
        if (this.state.enableGroupVideoCall !== false) {
          this.setState({
            enableGroupVideoCall: false
          });
        }
      });
    });
    _defineProperty(this, "enableOneOnOneVoiceCall", () => {
      this.context.FeatureRestriction.isOneOnOneAudioCallEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        const combinedResponse = response && !this.context.item.blockedByMe;
        if (combinedResponse !== this.state.enableOneOnOneVoiceCall) {
          this.setState({
            enableOneOnOneVoiceCall: combinedResponse
          });
        }
      }).catch(error => {
        if (this.state.enableOneOnOneVoiceCall !== false) {
          this.setState({
            enableOneOnOneVoiceCall: false
          });
        }
      });
    });
    _defineProperty(this, "enableOneOnOneVideoCall", () => {
      this.context.FeatureRestriction.isOneOnOneVideoCallEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        const combinedResponse = response && !this.context.item.blockedByMe;
        if (combinedResponse !== this.state.enableOneOnOneVideoCall) {
          this.setState({
            enableOneOnOneVideoCall: combinedResponse
          });
        }
      }).catch(error => {
        if (this.state.enableOneOnOneVideoCall !== false) {
          this.setState({
            enableOneOnOneVideoCall: false
          });
        }
      });
    });
    _defineProperty(this, "enableUserPresence", () => {
      this.context.FeatureRestriction.isUserPresenceEnabled().then(response => {
        if (response !== this.state.enableUserPresence) {
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
    _defineProperty(this, "enableAddGroupMembers", () => {
      this.context.FeatureRestriction.isAddingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableAddGroupMembers) {
          this.setState({
            enableAddGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableAddGroupMembers !== false) {
          this.setState({
            enableAddGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableChangeScope", () => {
      this.context.FeatureRestriction.isChangingGroupMemberScopeEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableChangeScope) {
          this.setState({
            enableChangeScope: response
          });
        }
      }).catch(error => {
        if (this.state.enableChangeScope !== false) {
          this.setState({
            enableChangeScope: false
          });
        }
      });
    });
    _defineProperty(this, "enableKickGroupMembers", () => {
      this.context.FeatureRestriction.isKickingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableKickGroupMembers) {
          this.setState({
            enableKickGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableKickGroupMembers !== false) {
          this.setState({
            enableKickGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableBanGroupMembers", () => {
      this.context.FeatureRestriction.isBanningGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableBanGroupMembers) {
          this.setState({
            enableBanGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableBanGroupMembers !== false) {
          this.setState({
            enableBanGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableDeleteGroup", () => {
      this.context.FeatureRestriction.isGroupDeletionEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableDeleteGroup) {
          this.setState({
            enableDeleteGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableDeleteGroup !== false) {
          this.setState({
            enableDeleteGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enableViewGroupMembers", () => {
      this.context.FeatureRestriction.isViewingGroupMembersEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableViewGroupMembers) {
          this.setState({
            enableViewGroupMembers: response
          });
        }
      }).catch(error => {
        if (this.state.enableViewGroupMembers !== false) {
          this.setState({
            enableViewGroupMembers: false
          });
        }
      });
    });
    _defineProperty(this, "enableLeaveGroup", () => {
      this.context.FeatureRestriction.isJoinLeaveGroupsEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableLeaveGroup) {
          this.setState({
            enableLeaveGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enableLeaveGroup !== false) {
          this.setState({
            enableLeaveGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enableSharedMedia", () => {
      this.context.FeatureRestriction.isSharedMediaEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enableSharedMedia) {
          this.setState({
            enableSharedMedia: response
          });
        }
      }).catch(error => {
        if (this.state.enableSharedMedia !== false) {
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
        if (response !== this.state.enableBlockUser) {
          this.setState({
            enableBlockUser: response
          });
        }
      }).catch(error => {
        if (this.state.enableBlockUser !== false) {
          this.setState({
            enableBlockUser: false
          });
        }
      });
    });
    _defineProperty(this, "initiateAudioCall", () => {
      this.props.actionGenerated(enums.ACTIONS["INITIATE_AUDIO_CALL"]);
    });
    _defineProperty(this, "initiateVideoCall", () => {
      this.props.actionGenerated(enums.ACTIONS["INITIATE_VIDEO_CALL"]);
    });
    _defineProperty(this, "viewDetail", () => {
      this.props.actionGenerated(enums.ACTIONS["VIEW_DETAIL"]);
    });
    this.state = {
      status: "",
      presence: "offline",
      typing: null,
      enableGroupVoiceCall: false,
      enableGroupVideoCall: false,
      enableOneOnOneVoiceCall: false,
      enableOneOnOneVideoCall: false,
      enableUserPresence: false,
      enableAddGroupMembers: false,
      enableChangeScope: false,
      enableKickGroupMembers: false,
      enableBanGroupMembers: false,
      enableDeleteGroup: false,
      enableViewGroupMembers: false,
      enableLeaveGroup: false,
      enableSharedMedia: false,
      enableBlockUser: false,
      enableTypingIndicator: false
    };
  }
  componentDidMount() {
    _chat.CometChat.getLoggedinUser().then(user => this.loggedInUser = user).catch(error => this.props.actionGenerated(enums.ACTIONS["ERROR"], [], "SOMETHING_WRONG"));
    this.MessageHeaderManager = new _controller.MessageHeaderManager();
    this.MessageHeaderManager.attachListeners(this.updateHeader);
    if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
      this.setStatusForUser();
    } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
      this.setStatusForGroup();
    }
    this.item = this.context.item;
    this.enableGroupVoiceCall();
    this.enableGroupVideoCall();
    this.enableOneOnOneVoiceCall();
    this.enableOneOnOneVideoCall();
    this.enableUserPresence();
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableTypingIndicator();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER && (this.item !== this.context.item || prevProps.lang !== this.props.lang)) {
      this.setStatusForUser();
    } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && (this.item !== this.context.item || prevProps.lang !== this.props.lang)) {
      this.setStatusForGroup();
    }
    this.item = this.context.item;
    this.enableGroupVoiceCall();
    this.enableGroupVideoCall();
    this.enableOneOnOneVoiceCall();
    this.enableOneOnOneVideoCall();
    this.enableUserPresence();
    this.enableAddGroupMembers();
    this.enableChangeScope();
    this.enableKickGroupMembers();
    this.enableBanGroupMembers();
    this.enableViewGroupMembers();
    this.enableDeleteGroup();
    this.enableLeaveGroup();
    this.enableSharedMedia();
    this.enableBlockUser();
    this.enableTypingIndicator();
  }
  componentWillUnmount() {
    this.MessageHeaderManager.removeListeners();
    this.MessageHeaderManager = null;
  }
  render() {
    let avatar, presence;
    let videoCallClassName = "option__videocall-user";
    let audioCallClassName = "option__audiocall-user";
    let viewDetailClassName = "option__viewdetail-user";
    let chatWithClassName = "chat__user";
    let chatNameClassName = "user__name";
    let chatStatusClassName = "user__status";
    if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
      avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        user: this.context.item
      });
      presence = /*#__PURE__*/_react.default.createElement(_Shared.CometChatUserPresence, {
        status: this.state.presence,
        borderColor: this.props.theme.borderColor.primary
      });
    } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
      chatWithClassName = "chat__group";
      chatNameClassName = "group__name";
      chatStatusClassName = "group__members";
      videoCallClassName = "option__videocall-group";
      audioCallClassName = "option__audiocall-group";
      viewDetailClassName = "option__viewdetail-group";
      avatar = /*#__PURE__*/_react.default.createElement(_Shared.CometChatAvatar, {
        group: this.context.item
      });
    }
    let typing = null;
    if (this.state.typing) {
      typing = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        fontSize: "13px",
        width: "100%",
        color: this.context.theme.color.helpText,
        fontStyle: "italic",
        className: chatStatusClassName
      }, this.state.typing);
    }
    let status = /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontSize: "13px",
      width: "100%",
      color: this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER ? this.state.presence === "offline" ? this.context.theme.color.helpText : this.context.theme.color.blue : this.context.theme.color.helpText,
      textTransform: this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER ? "capitalize" : "none",
      className: chatStatusClassName
    }, this.state.status);
    const viewDetailText = _translator.default.translate("VIEW_DETAIL", this.context.language);
    let viewDetailBtn = /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: viewDetailClassName,
      w: "24px",
      h: "24px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      ml: "16px",
      title: viewDetailText,
      onClick: this.viewDetail
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.Info, {
      size: 32,
      weight: "duotone"
    }));

    /**
     * If the chat window open is of users and block user and shared media feature is disabled, hide view detail button
     */
    if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
      if (this.state.enableBlockUser === false && this.state.enableSharedMedia === false) {
        viewDetailBtn = null;
      }
    } else if (this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP) {
      var _this$context$item, _this$context$item2, _this$context$item3;
      /**
       * If the chat window open is of group
       */
      if (((_this$context$item = this.context.item) === null || _this$context$item === void 0 ? void 0 : _this$context$item.scope) === _chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT) {
        /**
         * If the loggedin user scope is participant, leave group, view group members, and shared media feature is disabled, hide view detail button
         */
        if (this.state.enableLeaveGroup === false && this.state.enableSharedMedia === false && this.state.enableViewGroupMembers === false) {
          viewDetailBtn = null;
        }
      } else if (((_this$context$item2 = this.context.item) === null || _this$context$item2 === void 0 ? void 0 : _this$context$item2.scope) === _chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR) {
        /**
         * If the loggedin user scope is moderator, leave group, view group members, kick & ban group members, changing scope of group members and shared media feature is disabled, hide view detail button
         */
        if (this.state.enableLeaveGroup === false && this.state.enableSharedMedia === false && this.state.enableViewGroupMembers === false && this.state.enableKickGroupMembers === false && this.state.enableBanGroupMembers === false && this.state.enableChangeScope === false) {
          viewDetailBtn = null;
        }
      } else if (((_this$context$item3 = this.context.item) === null || _this$context$item3 === void 0 ? void 0 : _this$context$item3.scope) === _chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN) {
        /**
         * If the loggedin user scope is admin, add group members, view group members, kick & ban group members, changing scope of group members, leave and delete group and shared media feature is disabled, hide view detail button
         */
        if (this.state.enableLeaveGroup === false && this.state.enableSharedMedia === false && this.state.enableViewGroupMembers === false && this.state.enableKickGroupMembers === false && this.state.enableBanGroupMembers === false && this.state.enableChangeScope === false && this.state.enableDeleteGroup === false && this.state.enableAddGroupMembers === false) {
          viewDetailBtn = null;
        }
      }
    }

    //if user presence is disabled in chat widget
    if (this.state.enableUserPresence === false && this.context.type === _chat.CometChat.ACTION_TYPE.TYPE_USER) {
      status = null;
    }
    return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "chat__header",
      p: "16px",
      w: "100%",
      bg: this.context.theme.backgroundColor.white,
      zIndex: "1",
      borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
      justify: "space-between",
      align: "center"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "chat__details",
      align: "center",
      width: "calc(100% - 116px)"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chat__sidebar-menu",
      cursor: "pointer",
      display: {
        base: "block",
        md: "none"
      },
      sx: _objectSpread({
        mask: "url(".concat(_menu.default, ") center center no-repeat"),
        width: "24px",
        height: "24px"
      }, this.props.hasOwnProperty("sidebar") && this.props.sidebar === 0 ? {
        display: "none !important"
      } : {}),
      onClick: this.resetChat
    }, /*#__PURE__*/_react.default.createElement(_phosphorReact.CaretLeft, {
      size: 24,
      weight: "duotone"
    })), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "chat__thumbnail",
      display: "inline-block",
      w: "36px",
      h: "36px",
      flexShrink: "0",
      m: "0 16px",
      position: "relative"
    }, avatar, presence), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: chatWithClassName,
      w: {
        base: "calc(100% - 80px)",
        md: "calc(100% - 50px)"
      },
      p: "0",
      flexGrow: "1",
      display: "flex",
      flexDirection: "column"
    }, /*#__PURE__*/_react.default.createElement(_react2.Heading, {
      as: "h6",
      className: chatNameClassName,
      m: "0",
      fontSize: "15px",
      fontWeight: "600",
      lineHeight: "22px",
      w: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: this.context.theme.primary,
      onMouseEnter: event => this.toggleTooltip(event, true),
      onMouseLeave: event => this.toggleTooltip(event, false)
    }, this.context.item.name), typing ? typing : status)), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "chat__options",
      justify: "space-between",
      align: "center",
      w: "auto"
    }, viewDetailBtn));
  }
}

// Specifies the default values for props:
exports.CometChatMessageHeader = CometChatMessageHeader;
_defineProperty(CometChatMessageHeader, "contextType", _CometChatContext.CometChatContext);
CometChatMessageHeader.defaultProps = {
  theme: _theme.theme,
  item: {},
  type: ""
};
CometChatMessageHeader.propTypes = {
  theme: _propTypes.default.object,
  item: _propTypes.default.object,
  type: _propTypes.default.string
};