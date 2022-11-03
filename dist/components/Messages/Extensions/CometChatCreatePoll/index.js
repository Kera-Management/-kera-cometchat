"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatCreatePoll = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _chat = require("@cometchat-pro/chat");
var _Shared = require("../../../Shared");
var _ = require("..");
var _CometChatContext = require("../../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../../util/enums.js"));
var _theme = require("../../../../resources/theme");
var _translator = _interopRequireDefault(require("../../../../resources/localization/translator"));
var _style = require("./style");
var _creating = _interopRequireDefault(require("./resources/creating.svg"));
var _addCircleFilled = _interopRequireDefault(require("./resources/add-circle-filled.svg"));
var _close = _interopRequireDefault(require("./resources/close.svg"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
      return (0, _react2.jsx)(_.CometChatCreatePollOptions, {
        key: index,
        option: option,
        tabIndex: index + 4,
        lang: this.context.language,
        optionChangeHandler: this.optionChangeHandler,
        removePollOption: this.removePollOption
      });
    });
    const createText = this.state.creatingPoll ? _translator.default.translate("CREATING", this.context.language) : _translator.default.translate("CREATE", this.context.language);
    return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_Shared.CometChatBackdrop, {
      show: true,
      clicked: this.props.close
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalWrapperStyle)(this.context),
      className: "modal__createpoll"
    }, (0, _react2.jsx)("span", {
      css: (0, _style.modalCloseStyle)(_close.default, this.context),
      className: "modal__close",
      onClick: this.props.close,
      title: _translator.default.translate("CLOSE", this.context.language)
    }), (0, _react2.jsx)("div", {
      css: (0, _style.modalBodyStyle)(),
      className: "modal__body"
    }, (0, _react2.jsx)("table", {
      css: (0, _style.modalTableStyle)(this.context)
    }, (0, _react2.jsx)("caption", {
      css: (0, _style.tableCaptionStyle)(),
      className: "modal__title"
    }, _translator.default.translate("CREATE_POLL", this.context.language)), (0, _react2.jsx)("tbody", {
      css: (0, _style.tableBodyStyle)()
    }, (0, _react2.jsx)("tr", {
      className: "error"
    }, (0, _react2.jsx)("td", {
      colSpan: "3"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.modalErrorStyle)(this.context)
    }, this.state.errorMessage))), (0, _react2.jsx)("tr", {
      className: "poll__question"
    }, (0, _react2.jsx)("td", null, (0, _react2.jsx)("label", null, _translator.default.translate("QUESTION", this.context.language))), (0, _react2.jsx)("td", {
      colSpan: "2"
    }, (0, _react2.jsx)("input", {
      type: "text",
      autoFocus: true,
      tabIndex: "1",
      placeholder: _translator.default.translate("ENTER_YOUR_QUESTION", this.context.language),
      ref: this.questionRef
    }))), (0, _react2.jsx)("tr", {
      className: "poll__options"
    }, (0, _react2.jsx)("td", null, (0, _react2.jsx)("label", null, _translator.default.translate("OPTIONS", this.context.language))), (0, _react2.jsx)("td", {
      colSpan: "2"
    }, (0, _react2.jsx)("input", {
      type: "text",
      tabIndex: "2",
      placeholder: _translator.default.translate("ENTER_YOUR_OPTION", this.context.language),
      ref: this.optionOneRef
    }))), (0, _react2.jsx)("tr", {
      ref: this.optionRef,
      className: "poll__options"
    }, (0, _react2.jsx)("td", null, "\xA0"), (0, _react2.jsx)("td", {
      colSpan: "2"
    }, (0, _react2.jsx)("input", {
      type: "text",
      tabIndex: "3",
      placeholder: _translator.default.translate("ENTER_YOUR_OPTION", this.context.language),
      ref: this.optionTwoRef
    }))), pollOptionView, (0, _react2.jsx)("tr", null, (0, _react2.jsx)("td", null, "\xA0"), (0, _react2.jsx)("td", null, (0, _react2.jsx)("label", null, _translator.default.translate("ADD_NEW_OPTION", this.context.language))), (0, _react2.jsx)("td", {
      css: (0, _style.iconWrapperStyle)()
    }, (0, _react2.jsx)("i", {
      tabIndex: "100",
      css: (0, _style.addOptionIconStyle)(_addCircleFilled.default, this.context),
      className: "option__add",
      onClick: this.addPollOption
    })))), (0, _react2.jsx)("tfoot", {
      css: (0, _style.tableFootStyle)(this.context, this.state, _creating.default)
    }, (0, _react2.jsx)("tr", {
      className: "createpoll"
    }, (0, _react2.jsx)("td", {
      colSpan: "2"
    }, (0, _react2.jsx)("button", {
      type: "button",
      onClick: this.createPoll
    }, (0, _react2.jsx)("span", null, createText)))))))));
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