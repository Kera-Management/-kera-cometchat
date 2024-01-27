"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreateGroup = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../Shared");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _style = require("./style");
var _creating = _interopRequireDefault(require("./resources/creating.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
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
        return (0, _react2.jsx)("option", {
          value: groupTypeKey,
          key: groupTypeKey
        }, groupTypes[groupTypeKey]);
      });
      if (groupTypeKeys.length > 1) {
        groupTypeSelect = (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, (0, _react2.jsx)("select", {
          css: (0, _style.inputStyle)(this.props),
          className: "grouptype",
          onChange: this.typeChangeHandler,
          value: this.state.type,
          tabIndex: "2"
        }, (0, _react2.jsx)("option", {
          value: ""
        }, _translator.default.translate("SELECT_GROUP_TYPE", this.context.language)), groupTypeListOptions)));
      } else {
        groupTypeSelect = (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, (0, _react2.jsx)("select", {
          css: (0, _style.inputStyle)(this.props),
          className: "grouptype",
          onChange: this.typeChangeHandler,
          value: this.state.type,
          tabIndex: "2"
        }, groupTypeListOptions)));
      }
    }
    let password = null;
    if (this.state.passwordInput) {
      password = (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, (0, _react2.jsx)("input", {
        autoComplete: "off",
        css: (0, _style.inputStyle)(this.context),
        placeholder: _translator.default.translate("ENTER_GROUP_PASSWORD", this.context.language),
        type: "password",
        tabIndex: "3",
        onChange: this.passwordChangeHandler,
        value: this.state.password
      })));
    }
    const createText = this.state.creatingGroup ? _translator.default.translate("CREATING", this.context.language) : _translator.default.translate("CREATE", this.context.language);
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.context),
      className: "modal__creategroup"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.modalCloseStyle)(_close.default, this.context),
      className: "modal__close",
      onClick: this.props.close,
      title: _translator.default.translate("CLOSE", this.context.language)
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalBodyStyle)(),
      className: "modal__body"
    }, (0, _react2.jsx)("table", {
      css: (0, _style.modalTableStyle)(this.props)
    }, (0, _react2.jsx)("caption", {
      css: (0, _style.tableCaptionStyle)(),
      className: "modal__title"
    }, " ", _translator.default.translate("CREATE_GROUP", this.context.language), " "), (0, _react2.jsx)("tbody", {
      css: (0, _style.tableBodyStyle)(),
      className: "modal__search"
    }, (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, (0, _react2.jsx)("div", {
      css: (0, _style.modalErrorStyle)(this.context)
    }, this.state.errorMessage))), (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, (0, _react2.jsx)("input", {
      autoComplete: "off",
      css: (0, _style.inputStyle)(this.props),
      className: "search__input",
      placeholder: _translator.default.translate("ENTER_GROUP_NAME", this.context.language),
      type: "text",
      tabIndex: "1",
      onChange: this.nameChangeHandler,
      value: this.state.name
    }))), groupTypeSelect, password), (0, _react2.jsx)("tfoot", {
      css: (0, _style.tableFootStyle)(this.context, this.state, _creating.default)
    }, (0, _react2.jsx)("tr", {
      className: "creategroup"
    }, (0, _react2.jsx)("td", null, (0, _react2.jsx)("button", {
      type: "button",
      tabIndex: "4",
      onClick: this.createGroup
    }, (0, _react2.jsx)("span", null, createText)))))))));
  }
}
exports.CometChatCreateGroup = CometChatCreateGroup;
_defineProperty(CometChatCreateGroup, "contextType", _CometChatContext.CometChatContext);