"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.filter.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreatePoll = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../../Shared");
var _ = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _creating = _interopRequireDefault(require("./resources/creating.svg"));
var _addCircleFilled = _interopRequireDefault(require("./resources/add-circle-filled.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatCreatePoll extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "loggedInUser", null);
    _defineProperty(this, "addPollOption", () => {
      const options = [...this.state.options];
      options.push({
        value: "",
        id: new Date().getTime()
      });
      this.setState({
        options: options
      });
    });
    _defineProperty(this, "removePollOption", option => {
      const options = [...this.state.options];
      const optionKey = options.findIndex(opt => opt.id === option.id);
      if (optionKey > -1) {
        options.splice(optionKey, 1);
        this.setState({
          options: options
        });
      }
    });
    _defineProperty(this, "optionChangeHandler", (event, option) => {
      const options = [...this.state.options];
      const optionKey = options.findIndex(opt => opt.id === option.id);
      if (optionKey > -1) {
        const newOption = _objectSpread(_objectSpread({}, option), {}, {
          value: event.target.value
        });
        options.splice(optionKey, 1, newOption);
        this.setState({
          options: options
        });
      }
    });
    _defineProperty(this, "createPoll", () => {
      const question = this.questionRef.current.value.trim();
      const firstOption = this.optionOneRef.current.value.trim();
      const secondOption = this.optionTwoRef.current.value.trim();
      const optionItems = [firstOption, secondOption];
      if (question.length === 0) {
        this.setState({
          errorMessage: _translator.default.translate("INVALID_POLL_QUESTION", this.context.language)
        });
        return false;
      }
      if (firstOption.length === 0 || secondOption.length === 0) {
        this.setState({
          errorMessage: _translator.default.translate("INVALID_POLL_OPTION", this.context.language)
        });
        return false;
      }
      this.state.options.forEach(function (option) {
        optionItems.push(option.value);
      });
      let receiverId;
      let receiverType = this.context.type;
      if (this.context.type === _chat.CometChat.RECEIVER_TYPE.USER) {
        receiverId = this.context.item.uid;
      } else if (this.context.type === _chat.CometChat.RECEIVER_TYPE.GROUP) {
        receiverId = this.context.item.guid;
      }
      this.setState({
        creatingPoll: true,
        errorMessage: ""
      });
      _chat.CometChat.callExtension("polls", "POST", "v2/create", {
        question: question,
        options: optionItems,
        receiver: receiverId,
        receiverType: receiverType
      }).then(response => {
        if (response && response.hasOwnProperty("success") && response["success"] === true) {
          this.setState({
            creatingPoll: false
          });
          this.props.actionGenerated(enums.ACTIONS["POLL_CREATED"]);
        } else {
          this.setState({
            errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
          });
        }
      }).catch(error => {
        this.setState({
          creatingPoll: false
        });
        this.setState({
          errorMessage: _translator.default.translate("SOMETHING_WRONG", this.context.language)
        });
      });
    });
    this.state = {
      errorMessage: "",
      options: [],
      creatingPoll: false
    };
    this.questionRef = /*#__PURE__*/_react.default.createRef();
    this.optionOneRef = /*#__PURE__*/_react.default.createRef();
    this.optionTwoRef = /*#__PURE__*/_react.default.createRef();
    this.optionRef = /*#__PURE__*/_react.default.createRef();
  }
  render() {
    const optionList = [...this.state.options];
    const pollOptionView = optionList.map((option, index) => {
      return /*#__PURE__*/_react.default.createElement(_.CometChatCreatePollOptions, {
        key: index,
        option: option,
        tabIndex: index + 4,
        lang: this.context.language,
        optionChangeHandler: this.optionChangeHandler,
        removePollOption: this.removePollOption
      });
    });
    const createText = this.state.creatingPoll ? _translator.default.translate("CREATING", this.context.language) : _translator.default.translate("CREATE", this.context.language);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "modal__createpoll",
      minWidth: "350px",
      minHeight: "450px",
      width: "50%",
      height: "40%",
      overflow: "hidden",
      backgroundColor: this.context.theme.backgroundColor.white,
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "1002",
      margin: "0 auto",
      boxShadow: "rgba(20, 20, 20, 0.2) 0 16px 32px, rgba(20, 20, 20, 0.04) 0 0 0 1px",
      borderRadius: "12px",
      display: "block",
      sx: {
        ["@media ".concat(this.context.theme.breakPoints[1], ", ").concat(this.context.theme.breakPoints[2])]: {
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
      cursor: "pointer",
      title: _translator.default.translate("CLOSE", this.context.language),
      onClick: this.props.close,
      sx: {
        mask: "url(".concat(_close.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.primaryColor
      }
    }), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "modal__body",
      padding: "24px",
      height: "100%",
      width: "100%"
    }, /*#__PURE__*/_react.default.createElement(_react2.Table, {
      borderCollapse: "collapse",
      margin: "0",
      padding: "0",
      width: "100%",
      height: "90%",
      sx: {
        tr: {
          borderBottom: "1px solid ".concat(this.context.theme.borderColor.primary),
          display: "table",
          width: "100%",
          tableLayout: "fixed"
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.TableCaption, {
      className: "modal__title",
      fontSize: "20px",
      marginBottom: "15px",
      fontWeight: "bold",
      textAlign: "left",
      placement: "top"
    }, _translator.default.translate("CREATE_POLL", this.context.language)), /*#__PURE__*/_react.default.createElement(_react2.Tbody, {
      height: "calc(100% - 40px)",
      overflowY: "auto",
      display: "block",
      sx: {
        "tr": {
          "td": {
            padding: "8px 16px",
            fontSize: "14px",
            "input": {
              width: "100%",
              border: "none",
              padding: "8px 16px",
              fontSize: "14px",
              "&:focus": {
                outline: "none"
              }
            },
            "label": {
              padding: "8px 16px"
            },
            ":first-of-type": {
              width: "120px"
            }
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      className: "error"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, {
      colSpan: 3
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      fontSize: "12px",
      color: this.context.theme.color.red,
      textAlign: "center",
      margin: "8px 0",
      width: "100%"
    }, this.state.errorMessage))), /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      className: "poll__question"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "label"
    }, _translator.default.translate("QUESTION", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.Td, {
      colSpan: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Input, {
      type: "text",
      autoFocus: true,
      tabIndex: 1,
      placeholder: _translator.default.translate("ENTER_YOUR_QUESTION", this.context.language),
      ref: this.questionRef,
      variant: "unstyled"
    }))), /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      className: "poll__options"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "label"
    }, _translator.default.translate("OPTIONS", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.Td, {
      colSpan: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Input, {
      type: "text",
      tabIndex: 2,
      placeholder: _translator.default.translate("ENTER_YOUR_OPTION", this.context.language),
      ref: this.optionOneRef,
      variant: "unstyled"
    }))), /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      ref: this.optionRef,
      className: "poll__options"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, null, "\xA0"), /*#__PURE__*/_react.default.createElement(_react2.Td, {
      colSpan: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Input, {
      type: "text",
      tabIndex: 3,
      placeholder: _translator.default.translate("ENTER_YOUR_OPTION", this.context.language),
      ref: this.optionTwoRef,
      variant: "unstyled"
    }))), pollOptionView, /*#__PURE__*/_react.default.createElement(_react2.Tr, null, /*#__PURE__*/_react.default.createElement(_react2.Td, null, "\xA0"), /*#__PURE__*/_react.default.createElement(_react2.Td, null, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      as: "label"
    }, _translator.default.translate("ADD_NEW_OPTION", this.context.language))), /*#__PURE__*/_react.default.createElement(_react2.Td, {
      width: "50px"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      tabIndex: 100,
      className: "option__add",
      backgroundSize: "28px 28px",
      cursor: "pointer",
      display: "block",
      height: "24px",
      width: "24px",
      onClick: this.addPollOption,
      sx: {
        mask: "url(".concat(_addCircleFilled.default, ") center center no-repeat"),
        backgroundColor: this.context.theme.secondaryTextColor
      }
    })))), /*#__PURE__*/_react.default.createElement(_react2.Tfoot, {
      display: "inline-block",
      sx: {
        tr: {
          border: "none",
          td: {
            textAlign: "center",
            button: _objectSpread(_objectSpread({
              cursor: "pointer",
              padding: "8px 16px",
              backgroundColor: this.context.theme.primaryColor,
              borderRadius: "5px",
              color: this.context.theme.color.white,
              fontSize: "14px",
              outline: "0",
              border: "0"
            }, this.state.creatingPoll ? {
              disabled: "true",
              pointerEvents: "none",
              background: "url(".concat(_creating.default, ") no-repeat right 10px center ").concat(this.context.theme.primaryColor)
            } : {}), {}, {
              span: _objectSpread({}, this.state.creatingPoll ? {
                marginRight: "24px"
              } : {})
            })
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_react2.Tr, {
      className: "createpoll"
    }, /*#__PURE__*/_react.default.createElement(_react2.Td, {
      colSpan: 2
    }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
      type: "button",
      onClick: this.createPoll,
      variant: "unstyled",
      sx: _objectSpread({
        cursor: "pointer",
        padding: "8px 16px",
        backgroundColor: this.context.theme.primaryColor,
        borderRadius: "5px",
        color: this.context.theme.color.white,
        fontSize: "14px",
        outline: "0",
        border: "0"
      }, this.state.creatingPoll ? {
        disabled: "true",
        pointerEvents: "none",
        background: "url(".concat(_creating.default, ") no-repeat right 10px center ").concat(this.context.theme.primaryColor)
      } : {})
    }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      sx: _objectSpread({}, this.state.creatingPoll ? {
        marginRight: "24px"
      } : {})
    }, createText)))))))));
  }
}

// Specifies the default values for props:
exports.CometChatCreatePoll = CometChatCreatePoll;
_defineProperty(CometChatCreatePoll, "contextType", _CometChatContext.CometChatContext);
CometChatCreatePoll.defaultProps = {
  theme: _theme.theme
};
CometChatCreatePoll.propTypes = {
  theme: _propTypes.default.object
};