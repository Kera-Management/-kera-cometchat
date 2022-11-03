"use strict";

require("core-js/modules/web.dom.iterable.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatLiveReactions = void 0;
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _chat = require("@cometchat-pro/chat");
var _CometChatContext = require("../../../util/CometChatContext");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _style = require("./style");
var _heart = _interopRequireDefault(require("./resources/heart.png"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CometChatLiveReactions extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "sendMessage", () => {
      var _this$context, _this$context2, _this$context3, _this$context3$item, _this$context4, _this$context4$item;
      //fetching the metadata type from constants
      const metadata = {
        type: enums.CONSTANTS["METADATA_TYPE_LIVEREACTION"],
        reaction: this.props.reaction
      };
      const receiverType = (this === null || this === void 0 ? void 0 : (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.type) === _chat.CometChat.ACTION_TYPE.TYPE_USER ? _chat.CometChat.ACTION_TYPE.TYPE_USER : _chat.CometChat.ACTION_TYPE.TYPE_GROUP;
      const receiverId = (this === null || this === void 0 ? void 0 : (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.type) === _chat.CometChat.ACTION_TYPE.TYPE_USER ? this === null || this === void 0 ? void 0 : (_this$context3 = this.context) === null || _this$context3 === void 0 ? void 0 : (_this$context3$item = _this$context3.item) === null || _this$context3$item === void 0 ? void 0 : _this$context3$item.uid : this === null || this === void 0 ? void 0 : (_this$context4 = this.context) === null || _this$context4 === void 0 ? void 0 : (_this$context4$item = _this$context4.item) === null || _this$context4$item === void 0 ? void 0 : _this$context4$item.guid;
      let transientMessage = new _chat.CometChat.TransientMessage(receiverId, receiverType, metadata);
      _chat.CometChat.sendTransientMessage(transientMessage);
    });
    _defineProperty(this, "setItems", () => {
      const width = this.parentElement.offsetWidth;
      const height = this.parentElement.offsetHeight;
      const elements = this.parentElement.querySelectorAll(".emoji");
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i],
          elementWidth = element.offsetWidth,
          elementHeight = element.offsetHeight;
        const item = {
          element: element,
          elementHeight: elementHeight,
          elementWidth: elementWidth,
          ySpeed: -this.verticalSpeed,
          omega: 2 * Math.PI * this.horizontalSpeed / (width * 60),
          //omega= 2Pi*frequency
          random: (Math.random() / 2 + 0.5) * i * 10000,
          //random time offset
          x: function x(time) {
            return (Math.sin(this.omega * (time + this.random)) + 1) / 2 * (width - elementWidth);
          },
          y: height + (Math.random() + 1) * i * elementHeight
        };
        this.items.push(item);
      }
    });
    _defineProperty(this, "requestAnimation", () => {
      this.timer = setTimeout(this.animate, 1000 / 60);
    });
    _defineProperty(this, "animate", () => {
      if (!this.parentElement) {
        return false;
      }
      const height = this.parentElement.offsetHeight;
      const time = +new Date(); //little trick, gives unix time in ms

      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        const transformString = "translate3d(" + item.x(time) + "px, " + item.y + "px, 0px)";
        item.element.style.transform = transformString;
        item.element.style.visibility = "visible";
        if (item.y <= height) {
          item.element.classList.add("fade");
        }
        item.y += item.ySpeed;
      }
      this.requestAnimation();
    });
    this.parentElement = /*#__PURE__*/_react.default.createRef();
    this.counter = 0;
    this.verticalSpeed = 5;
    this.horizontalSpeed = 2;
    this.items = [];
    this.before = Date.now();
    const reaction = props.reaction ? enums.CONSTANTS["LIVE_REACTIONS"][props.reaction] : enums.CONSTANTS["LIVE_REACTIONS"]["heart"];
    const reactionImg = (0, _react2.jsx)("img", {
      src: _heart.default,
      alt: reaction
    });
    this.emojis = Array(6).fill(reactionImg);
  }
  componentDidMount() {
    //this.sendMessage();
    this.setItems();
    this.requestAnimation();
  }
  componentWillUnmount() {
    this.timer = null;
  }
  render() {
    const emojis = this.emojis.map((emoji, index) => (0, _react2.jsx)("span", {
      className: "emoji",
      css: (0, _style.reactionEmojiStyle)(),
      key: index
    }, emoji));
    return (0, _react2.jsx)("div", {
      ref: el => this.parentElement = el,
      css: (0, _style.reactionContainerStyle)()
    }, emojis);
  }
}
exports.CometChatLiveReactions = CometChatLiveReactions;
_defineProperty(CometChatLiveReactions, "contextType", _CometChatContext.CometChatContext);