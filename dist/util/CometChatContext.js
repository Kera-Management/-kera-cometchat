"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatContextProvider = exports.CometChatContext = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../components/Shared");
var _UIKitSettings = require("./UIKitSettings");
var enums = _interopRequireWildcard(require("./enums.js"));
var _translator = _interopRequireDefault(require("../resources/localization/translator"));
var _FeatureRestriction = require("./FeatureRestriction");
var _theme = require("../resources/theme");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const CometChatContext = exports.CometChatContext = /*#__PURE__*/_react.default.createContext({});
class CometChatContextProvider extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "loggedInUser", void 0);
    _defineProperty(this, "setRoles", () => {
      const roles = {
        [_chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN]: _translator.default.translate("ADMINISTRATOR", this.props.language),
        [_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]: _translator.default.translate("MODERATOR", this.props.language),
        [_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]: _translator.default.translate("PARTICIPANT", this.props.language)
      };
      this.setState({
        roles: roles
      });
    });
    _defineProperty(this, "getUser", uid => {
      const promise = new Promise((resolve, reject) => {
        if (!uid) {
          const error = {
            code: "uid not available"
          };
          reject(error);
        }
        _chat.CometChat.getUser(uid).then(user => resolve(user)).catch(error => reject(error));
      });
      return promise;
    });
    _defineProperty(this, "getGroup", guid => {
      const promise = new Promise((resolve, reject) => {
        if (!guid) {
          const error = {
            code: "guid not available"
          };
          reject(error);
        }
        _chat.CometChat.getGroup(guid).then(group => {
          if (group.hasJoined === false) {
            const guid = group.guid;
            const groupType = group.type;
            let password = "";
            if (groupType === _chat.CometChat.GROUP_TYPE.PASSWORD) {
              const promptMessage = _translator.default.translate("Enter password", this.props.lang);
              password = prompt(promptMessage);
            }
            _chat.CometChat.joinGroup(guid, groupType, password).then(group => resolve(group)).catch(error => reject(error));
          } else {
            resolve(group);
          }
        }).catch(error => reject(error));
      });
      return promise;
    });
    _defineProperty(this, "setToastMessage", (type, message) => {
      // switch(type) {

      //     case "error":
      //         this.toastRef.setError(message);
      //     break;
      //     case "success":
      //         this.toastRef.setSuccess(message);
      //         break;
      //     case "info":
      //         this.toastRef.setInfo(message);
      //         break;
      //     case "warning":
      //         this.toastRef.setWarning(message);
      //         break;
      //     default:
      //     break;
      // }

      return null;
    });
    _defineProperty(this, "getLoggedinUser", () => {
      let timerCounter = 10000;
      let timer = 0;
      return new Promise((resolve, reject) => {
        if (timerCounter === timer) {
          return reject("timer reached ".concat(timerCounter));
        }
        if (this.loggedInUser) {
          return resolve(this.loggedInUser);
        }
        if (!_chat.CometChat.isInitialized()) {
          return reject("CometChat not initialized");
        }
        this.isUserLoggedIn = setInterval(() => {
          _chat.CometChat.getLoggedinUser().then(user => {
            this.loggedInUser = user;
            clearInterval(this.isUserLoggedIn);
            return resolve(user);
          }).catch(error => reject(error));
          timer += 100;
        }, 100);
      });

      // return new Promise((resolve, reject) => {
      // 	CometChat.getLoggedinUser()
      // 		.then(user => resolve(user))
      // 		.catch(error => reject(error));
      // });
    });
    _defineProperty(this, "clearGroupMembers", () => {
      this.setState({
        groupMembers: [],
        groupAdmins: [],
        groupModerators: [],
        bannedGroupMembers: []
      });
    });
    _defineProperty(this, "setAllGroupMembers", (groupMembers, groupAdmins, groupModerators) => {
      this.setState({
        groupMembers: [...this.state.groupMembers, ...groupMembers],
        groupAdmins: [...this.state.groupAdmins, ...groupAdmins],
        groupModerators: [...this.state.groupModerators, ...groupModerators]
      });
    });
    _defineProperty(this, "updateGroupMembers", groupMembers => {
      this.setState({
        groupMembers: [...groupMembers]
      });
    });
    _defineProperty(this, "setGroupMembers", groupMembers => {
      this.setState({
        groupMembers: [...this.state.groupMembers, ...groupMembers]
      });
    });
    _defineProperty(this, "setGroupAdmins", groupAdmins => {
      this.setState({
        groupAdmins: [...this.state.groupAdmins, ...groupAdmins]
      });
    });
    _defineProperty(this, "setGroupModerators", groupModerators => {
      this.setState({
        groupModerators: [...this.state.groupModerators, ...groupModerators]
      });
    });
    _defineProperty(this, "setBannedGroupMembers", bannedMembers => {
      this.setState({
        bannedGroupMembers: [...this.state.bannedGroupMembers, ...bannedMembers]
      });
    });
    _defineProperty(this, "updateBannedGroupMembers", bannedMembers => {
      this.setState({
        bannedGroupMembers: [...bannedMembers]
      });
    });
    _defineProperty(this, "setCallInProgress", (call, callType) => {
      this.setState({
        callInProgress: _objectSpread({}, call),
        callType
      });
    });
    _defineProperty(this, "setItem", item => {
      this.setState({
        item: _objectSpread({}, item)
      });
    });
    _defineProperty(this, "setType", type => {
      this.setState({
        type
      });
    });
    _defineProperty(this, "setTypeAndItem", (type, item) => {
      this.setState({
        item: _objectSpread({}, item),
        type
      });
    });
    _defineProperty(this, "setDeletedGroupId", guid => {
      this.setState({
        deletedGroupId: guid
      });
    });
    _defineProperty(this, "setLeftGroupId", guid => {
      this.setState({
        leftGroupId: guid
      });
    });
    _defineProperty(this, "setLastMessage", message => {
      this.setState({
        lastMessage: message
      });
    });
    _defineProperty(this, "setClearedUnreadMessages", flag => {
      this.setState({
        clearedUnreadMessages: flag
      });
    });
    _defineProperty(this, "setDirectCallCustomMessage", (message, event) => {
      this.setState({
        directCallCustomMessage: message,
        directCallCustomMessageAction: event
      });
    });
    _defineProperty(this, "checkIfDirectCallIsOngoing", () => {
      let output = null;
      if (Object.keys(this.state.callInProgress).length && (this.state.callType === enums.CONSTANTS["INCOMING_DIRECT_CALLING"] || this.state.callType === enums.CONSTANTS["OUTGOING_DIRECT_CALLING"])) {
        if (this.state.callInProgress.customData.sessionID === this.state.item.guid) {
          output = enums.CONSTANTS.CALLS["ONGOING_CALL_SAME_GROUP"];
        } else {
          output = enums.CONSTANTS.CALLS["ONGOING_CALL_DIFF_GROUP"];
        }
      }
      return output;
    });
    _defineProperty(this, "checkIfCallIsOngoing", () => {
      if (Object.keys(this.state.callInProgress).length) {
        return true;
      }
      return false;
    });
    _defineProperty(this, "getActiveCallSessionID", () => {
      let sessionID;
      if (this.state.callType === enums.CONSTANTS["INCOMING_DIRECT_CALLING"] || this.state.callType === enums.CONSTANTS["OUTGOING_DIRECT_CALLING"]) {
        var _this$state$callInPro;
        sessionID = (_this$state$callInPro = this.state.callInProgress) === null || _this$state$callInPro === void 0 || (_this$state$callInPro = _this$state$callInPro.data) === null || _this$state$callInPro === void 0 || (_this$state$callInPro = _this$state$callInPro.customData) === null || _this$state$callInPro === void 0 ? void 0 : _this$state$callInPro.sessionID;
      } else {
        var _this$state$callInPro2;
        sessionID = (_this$state$callInPro2 = this.state.callInProgress) === null || _this$state$callInPro2 === void 0 ? void 0 : _this$state$callInPro2.sessionId;
      }
      return sessionID;
    });
    _defineProperty(this, "hasKeyValue", (data, key) => {
      if (data.hasOwnProperty(key) === false || data[key] === null || data[key] === undefined) {
        return false;
      }
      return true;
    });
    const settings = new _UIKitSettings.UIKitSettings();
    const featureRestriction = new _FeatureRestriction.FeatureRestriction(settings);
    this.state = {
      item: {},
      type: "",
      toastMessage: props.toastMessage,
      groupMembers: props.groupMembers,
      bannedGroupMembers: props.bannedGroupMembers,
      groupAdmins: props.groupAdmins,
      groupModerators: props.groupModerators,
      callInProgress: props.callInProgress,
      callType: "",
      deletedGroupId: "",
      leftGroupId: "",
      lastMessage: {},
      unreadMessages: [],
      clearedUnreadMessages: false,
      directCallCustomMessage: {},
      directCallCustomMessageAction: "",
      UIKitSettings: settings,
      FeatureRestriction: featureRestriction,
      theme: _theme.theme,
      language: props.language,
      roles: {
        [_chat.CometChat.GROUP_MEMBER_SCOPE.ADMIN]: _translator.default.translate("ADMINISTRATOR", props.language),
        [_chat.CometChat.GROUP_MEMBER_SCOPE.MODERATOR]: _translator.default.translate("MODERATOR", props.language),
        [_chat.CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT]: _translator.default.translate("PARTICIPANT", props.language)
      },
      getLoggedinUser: this.getLoggedinUser,
      setGroupMembers: this.setGroupMembers,
      updateGroupMembers: this.updateGroupMembers,
      setAllGroupMembers: this.setAllGroupMembers,
      setGroupAdmins: this.setGroupAdmins,
      setGroupModerators: this.setGroupModerators,
      setBannedGroupMembers: this.setBannedGroupMembers,
      updateBannedGroupMembers: this.updateBannedGroupMembers,
      clearGroupMembers: this.clearGroupMembers,
      setToastMessage: this.setToastMessage,
      setCallInProgress: this.setCallInProgress,
      setItem: this.setItem,
      setType: this.setType,
      setTypeAndItem: this.setTypeAndItem,
      setDeletedGroupId: this.setDeletedGroupId,
      setLeftGroupId: this.setLeftGroupId,
      setLastMessage: this.setLastMessage,
      setClearedUnreadMessages: this.setClearedUnreadMessages,
      setDirectCallCustomMessage: this.setDirectCallCustomMessage,
      checkIfDirectCallIsOngoing: this.checkIfDirectCallIsOngoing,
      checkIfCallIsOngoing: this.checkIfCallIsOngoing,
      getActiveCallSessionID: this.getActiveCallSessionID,
      hasKeyValue: this.hasKeyValue,
      setRoles: this.setRoles
    };
    this.toastRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    this.getLoggedinUser();
    if (this.props.user.trim().length) {
      this.getUser(this.props.user.trim()).then(user => {
        this.setType(_chat.CometChat.ACTION_TYPE.TYPE_USER);
        this.setItem(user);
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "uid not available";
        this.toastRef.setError(errorCode);
      });
    } else if (this.props.group.trim().length) {
      this.getGroup(this.props.group.trim()).then(group => {
        this.setType(_chat.CometChat.ACTION_TYPE.TYPE_GROUP);
        this.setItem(group);
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "guid not available";
        this.toastRef.setError(errorCode);
      });
    } else if (this.props.user.trim().length === 0 && this.props.group.trim().length === 0 && this.props._component === enums.CONSTANTS["MESSAGES_COMPONENT"]) {
      const errorCode = "UID_OR_GUID_NOT_AVAILABLE";
      this.toastRef.setError(errorCode);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.trim().length && prevProps.user !== this.props.user) {
      this.getUser(this.props.user).then(user => {
        //this.setType(CometChat.ACTION_TYPE.TYPE_USER);
        //this.setItem(user);
        this.setTypeAndItem(_chat.CometChat.ACTION_TYPE.TYPE_USER, user);
        //this.setClearedUnreadMessages(false);
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "uid not available";
        this.toastRef.setError(errorCode);
      });
    } else if (this.props.group.trim().length && prevProps.group !== this.props.group) {
      this.getGroup(this.props.group).then(group => {
        //this.setType(CometChat.ACTION_TYPE.TYPE_GROUP);
        //this.setItem(group);
        this.setTypeAndItem(_chat.CometChat.ACTION_TYPE.TYPE_GROUP, group);
        //this.setClearedUnreadMessages(false);
      }).catch(error => {
        const errorCode = error && error.hasOwnProperty("code") ? error.code : "guid not available";
        this.toastRef.setError(errorCode);
      });
    }

    //when the active group is deleted, close the chat window.
    if (this.state.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.state.item.guid === this.state.deletedGroupId) {
      //this.setItem({});
      //this.setType("");
      this.setTypeAndItem({}, "");
      this.setDeletedGroupId("");
    }

    //when the active group is left, close the chat window.
    if (this.state.type === _chat.CometChat.ACTION_TYPE.TYPE_GROUP && this.state.item.guid === this.state.leftGroupId) {
      this.setTypeAndItem({}, "");
      this.setLeftGroupId("");
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        language: this.props.language
      });
      this.setRoles();
    }
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(CometChatContext.Provider, {
      value: this.state
    }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatToastNotification, {
      ref: el => this.toastRef = el,
      lang: this.props.language,
      position: this.props.toastNotificationPos
    }), this.props.children);
  }
}
exports.CometChatContextProvider = CometChatContextProvider;
CometChatContextProvider.defaultProps = {
  toastMessage: {},
  groupMembers: [],
  bannedGroupMembers: [],
  groupAdmins: [],
  groupModerators: [],
  callInProgress: {},
  user: "",
  group: "",
  _component: "",
  language: _translator.default.getDefaultLanguage()
};
CometChatContextProvider.propTypes = {
  toastMessage: _propTypes.default.object,
  groupMembers: _propTypes.default.array,
  bannedGroupMembers: _propTypes.default.array,
  groupAdmins: _propTypes.default.array,
  groupModerators: _propTypes.default.array,
  callInProgress: _propTypes.default.object,
  group: _propTypes.default.string,
  user: _propTypes.default.string,
  _component: _propTypes.default.string,
  language: _propTypes.default.string
};