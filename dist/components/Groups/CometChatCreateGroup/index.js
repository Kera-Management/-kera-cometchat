"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreateGroup = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _creating = _interopRequireDefault(require("./resources/creating.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatCreateGroup extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "enablePublicGroup", () => {
      this.context.FeatureRestriction.isPublicGroupEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePublicGroup) {
          this.setState({
            enablePublicGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enablePublicGroup !== false) {
          this.setState({
            enablePublicGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enablePasswordGroup", () => {
      this.context.FeatureRestriction.isPasswordGroupEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePasswordGroup) {
          this.setState({
            enablePasswordGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enablePasswordGroup !== false) {
          this.setState({
            enablePasswordGroup: false
          });
        }
      });
    });
    _defineProperty(this, "enablePrivateGroup", () => {
      this.context.FeatureRestriction.isPrivateGroupEnabled().then(response => {
        /**
         * Don't update state if the response has the same value
         */
        if (response !== this.state.enablePrivateGroup) {
          this.setState({
            enablePrivateGroup: response
          });
        }
      }).catch(error => {
        if (this.state.enablePrivateGroup !== false) {
          this.setState({
            enablePrivateGroup: false
          });
        }
      });
    });
    _defineProperty(this, "passwordChangeHandler", event => {
      this.setState({
        password: event.target.value
      });
    });
    _defineProperty(this, "nameChangeHandler", event => {
      this.setState({
        name: event.target.value
      });
    });
    _defineProperty(this, "typeChangeHandler", event => {
      const type = event.target.value;
      this.setState({
        type
      });
      if (type === _chat.CometChat.GROUP_TYPE.PASSWORD) {
        this.setState({
          passwordInput: true
        });
      } else {
        this.setState({
          passwordInput: false
        });
      }
    });
    _defineProperty(this, "validate", () => {
      const groupName = this.state.name.trim();
      const groupType = this.state.type.trim();
      if (!groupName) {
        this.setState({
          errorMessage: _translator.default.translate("INVALID_GROUP_NAME", this.context.language)
        });
        return false;
      }
      if (!groupType) {
        this.setState({
          errorMessage: _translator.default.translate("INVALID_GROUP_TYPE", this.context.language)
        });
        return false;
      }
      let password = "";
      if (groupType === _chat.CometChat.GROUP_TYPE.PASSWORD) {
        password = this.state.password;
        if (!password.length) {
          this.setState({
            errorMessage: _translator.default.translate("INVALID_PASSWORD", this.context.language)
          });
          return false;
        }
      }
      return true;
    });
    _defineProperty(this, "createGroup", () => {
      if (!this.validate()) {
        return false;
      }
      this.setState({
        creatingGroup: true
      });
      const groupType = this.state.type.trim();
      const password = this.state.password;
      const guid = "group_" + new Date().getTime();
      const name = this.state.name.trim();
      let type = _chat.CometChat.GROUP_TYPE.PUBLIC;
      switch (groupType) {
        case "public":
          type = _chat.CometChat.GROUP_TYPE.PUBLIC;
          break;
        case "private":
          type = _chat.CometChat.GROUP_TYPE.PRIVATE;
          break;
        case "password":
          type = _chat.CometChat.GROUP_TYPE.PASSWORD;
          break;
        default:
          break;
      }
      const group = new _chat.CometChat.Group(guid, name, type, password);
      _chat.CometChat.createGroup(group).then(newGroup => {
        this.setState({
          creatingGroup: false
        });
        if (typeof newGroup === "object" && Object.keys(newGroup).length) {
          this.context.setToastMessage("success", "GROUP_CREATION_SUCCESS");
          this.setState({
            name: "",
            type: "",
            password: "",
            passwordInput: ""
          });
          this.props.actionGenerated(enums.ACTIONS["GROUP_CREATED"], newGroup);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => {
        this.setState({
          creatingGroup: false,
          errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
        });
      });
    });
    _defineProperty(this, "populateGroupType", () => {});
    this.state = {
      errorMessage: "",
      passwordInput: false,
      name: "",
      type: "",
      password: "",
      creatingGroup: false,
      enablePublicGroup: false,
      enablePasswordGroup: false,
      enablePrivateGroup: false
    };
  }
  componentDidMount() {
    this.enablePublicGroup();
    this.enablePasswordGroup();
    this.enablePrivateGroup();
  }
  componentDidUpdate() {
    this.enablePublicGroup();
    this.enablePasswordGroup();
    this.enablePrivateGroup();
  }
  render() {
    const groupTypes = {};
    let groupTypeSelect = null;
    if (this.state.enablePublicGroup === true) {
      groupTypes[_chat.CometChat.GROUP_TYPE.PUBLIC] = _translator.default.translate("PUBLIC", this.context.language);
    }
    if (this.state.enablePasswordGroup === true) {
      groupTypes[_chat.CometChat.GROUP_TYPE.PASSWORD] = _translator.default.translate("PASSWORD_PROTECTED", this.context.language);
    }
    if (this.state.enablePrivateGroup === true) {
      groupTypes[_chat.CometChat.GROUP_TYPE.PRIVATE] = _translator.default.translate("PRIVATE", this.context.language);
    }
    const groupTypeKeys = Object.keys(groupTypes);
    if (groupTypeKeys.length) {
      const groupTypeListOptions = groupTypeKeys.map(groupTypeKey => {
        return /*#__PURE__*/_react.default.createElement("option", {
          value: groupTypeKey,
          key: groupTypeKey
        }, groupTypes[groupTypeKey]);
      });
      if (groupTypeKeys.length > 1) {
        groupTypeSelect = /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Select, {
          className: "grouptype",
          onChange: this.typeChangeHandler,
          value: this.state.type,
          tabIndex: "2",
          display: "block",
          width: "100%",
          border: "0",
          boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
          borderRadius: "8px",
          backgroundColor: this.context.theme.backgroundColor.grey,
          color: this.context.theme.color.helpText,
          fontSize: "14px"
        }, /*#__PURE__*/_react.default.createElement("option", {
          value: ""
        }, _translator.default.translate("SELECT_GROUP_TYPE", this.context.language)), groupTypeListOptions)));
      } else {
        groupTypeSelect = /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Select, {
          className: "grouptype",
          onChange: this.typeChangeHandler,
          value: this.state.type,
          tabIndex: "2",
          display: "block",
          width: "100%",
          border: "0",
          boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
          borderRadius: "8px",
          backgroundColor: this.context.theme.backgroundColor.grey,
          color: this.context.theme.color.helpText,
          fontSize: "14px"
        }, groupTypeListOptions)));
      }
    }
    let password = null;
    if (this.state.passwordInput) {
      password = /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Input, {
        autoComplete: "off",
        placeholder: _translator.default.translate("ENTER_GROUP_PASSWORD", this.context.language),
        type: "password",
        tabIndex: "3",
        onChange: this.passwordChangeHandler,
        value: this.state.password,
        display: "block",
        width: "100%",
        border: "0",
        boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
        borderRadius: "8px",
        backgroundColor: this.context.theme.backgroundColor.grey,
        color: this.context.theme.color.helpText,
        fontSize: "14px"
      })));
    }
    const createText = this.state.creatingGroup ? _translator.default.translate("CREATING", this.context.language) : _translator.default.translate("CREATE", this.context.language);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "modal__creategroup",
      minWidth: "350px",
      minHeight: "350px",
      width: "40%",
      height: "40%",
      overflow: "hidden",
      backgroundColor: this.context.theme.backgroundColor.white,
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 4,
      margin: "0 auto",
      boxShadow: "rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px",
      borderRadius: "12px",
      display: "block",
      sx: {
        [this.context.theme.breakPoints[0]]: {
          width: "100%",
          height: "100%"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "modal__close",
      position: "absolute",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      top: "16px",
      right: "16px",
      sx: {
        mask: "url(".concat(_close.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      },
      cursor: "pointer",
      onClick: this.props.close,
      title: _translator.default.translate("CLOSE", this.context.language)
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "modal__body",
      p: 6,
      height: "100%",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Table, {
      borderCollapse: "collapse",
      m: 0,
      p: 0,
      width: "100%",
      height: "90%",
      sx: {
        "tr": {
          display: "table",
          width: "100%",
          tableLayout: "fixed"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "caption",
      className: "modal__title",
      fontSize: "20px",
      mb: 4,
      fontWeight: "bold",
      textAlign: "left"
    }, _translator.default.translate("CREATE_GROUP", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Tbody, {
      className: "modal__search",
      height: "calc(100% - 40px)",
      overflowY: "auto",
      display: "block",
      sx: {
        "tr": {
          "td": {
            padding: "8px 0",
            fontSize: "14px",
            "input": {
              width: "100%",
              border: "none",
              padding: "8px 16px",
              fontSize: "14px",
              outline: "none"
            },
            "select": {
              outline: "none",
              padding: "8px 16px"
            }
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      fontSize: "12px",
      color: this.context.theme.color.red,
      textAlign: "center",
      margin: "8px 0",
      width: "100%"
    }, this.state.errorMessage))), /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Input, {
      autoComplete: "off",
      className: "search__input",
      placeholder: _translator.default.translate("ENTER_GROUP_NAME", this.context.language),
      type: "text",
      tabIndex: "1",
      onChange: this.nameChangeHandler,
      value: this.state.name,
      display: "block",
      width: "100%",
      border: "0",
      boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
      borderRadius: "8px",
      backgroundColor: this.context.theme.backgroundColor.grey,
      color: this.context.theme.color.helpText,
      fontSize: "14px"
    }))), groupTypeSelect, password), /*#__PURE__*/_react.default.createElement(_react2.Tfoot, {
      display: "inline-block",
      sx: {
        "tr": {
          border: "none",
          "td": {
            textAlign: "center"
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      className: "creategroup"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      type: "button",
      tabIndex: "4",
      onClick: this.createGroup,
      cursor: "pointer",
      p: "8px 16px",
      backgroundColor: this.context.theme.primaryColor,
      borderRadius: "5px",
      color: this.context.theme.color.white,
      fontSize: "14px",
      outline: "0",
      border: "0",
      sx: _objectSpread({}, this.state.creatingGroup ? {
        disabled: "true",
        pointerEvents: "none",
        background: "url(".concat(_creating.default, ") no-repeat right 10px center ").concat(this.context.theme.primaryColor)
      } : {})
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      sx: _objectSpread({}, this.state.creatingGroup ? {
        marginRight: "24px"
      } : {})
    }, createText)))))))));
  }
}
exports.CometChatCreateGroup = CometChatCreateGroup;
_defineProperty(CometChatCreateGroup, "contextType", _CometChatContext.CometChatContext);