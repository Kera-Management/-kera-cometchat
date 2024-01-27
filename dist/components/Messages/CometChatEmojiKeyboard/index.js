"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEmojiKeyboard = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _emojis = require("./emojis");
var _EmojiCategory = require("./EmojiCategory");
var _Emoji = require("./Emoji");
var _style = require("./style");
var _Shared = require("../../Shared");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 *
 * CometChatEmojiKeyboard is a component that fetch emoji from emjis file and displays emoji
 * in the CometChatListItem component.
 *
 *
 * @version 1.0.0
 * @author CometChatTeam
 * @copyright © 2022 CometChat Inc.
 *
 */

const CometChatEmojiKeyboard = props => {
  const handleEvent = obj => {
    props.onClick(obj);
  };
  const autoScrollView = id => {
    document.getElementById(id).scrollIntoView(true);
  };
  const renderItems = () => {
    let emojiJSX = null;
    let emojiCategoryJSX = [];
    let renderId = null;
    emojiJSX = _emojis.Emojis === null || _emojis.Emojis === void 0 ? void 0 : _emojis.Emojis.map((el, i) => {
      var _Object$values;
      const vals = Object === null || Object === void 0 ? void 0 : Object.values(el)[0];
      renderId = Math.floor(Math.random() * ((_emojis.Emojis === null || _emojis.Emojis === void 0 ? void 0 : _emojis.Emojis.length) - 0) + i);
      /**Each json iteration filter through EmojiCategory class */
      const emojiCategory = new _EmojiCategory.CometChatEmojiCategory({
        id: vals.id,
        name: vals.name,
        symbol: vals.symbol,
        emojis: vals.emojis
      });
      /**Emoji Category List */
      emojiCategoryJSX.push( /*#__PURE__*/_react.default.createElement("div", {
        key: emojiCategory.id,
        className: "emoji__autoscroll"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatListItem, {
        key: emojiCategory.id,
        id: emojiCategory.id,
        iconURL: emojiCategory.symbol,
        style: (0, _style.getListStyle)(),
        onItemClick: autoScrollView.bind(void 0, emojiCategory.id)
      })));
      const title = /*#__PURE__*/_react.default.createElement("p", {
        className: "emoji__category__title",
        style: (0, _style.emojiCategoryTitle)(props)
      }, emojiCategory.name);

      /**Emojis List */
      let emojiList = null;
      emojiList = Object === null || Object === void 0 ? void 0 : (_Object$values = Object.values(emojiCategory === null || emojiCategory === void 0 ? void 0 : emojiCategory.emojis)) === null || _Object$values === void 0 ? void 0 : _Object$values.map((emoji, i) => {
        var _Object$values2;
        let emojiId = Math.floor(Math.random() * ((Object === null || Object === void 0 ? void 0 : (_Object$values2 = Object.values) === null || _Object$values2 === void 0 ? void 0 : _Object$values2.length) - 0) + i);
        const emojiInstance = new _Emoji.CometChatEmoji({
          char: emoji.char,
          keywords: emoji.keywords
        });
        return /*#__PURE__*/_react.default.createElement(_Shared.CometChatListItem, {
          id: emojiId,
          key: emojiId,
          onItemClick: handleEvent.bind(void 0, emojiInstance),
          style: (0, _style.listStyle)(props),
          text: emojiInstance.char
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        key: emojiCategory.id,
        id: emojiCategory.id // for auto scroll
        ,
        className: "emoji__category__wrapper",
        style: (0, _style.emojiCategoryWrapper)(props)
      }, title, /*#__PURE__*/_react.default.createElement("div", {
        className: "emoji__list",
        style: (0, _style.emojiListStyle)(props)
      }, emojiList));
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "emoji__keyboard",
      style: (0, _style.emojiContainerStyle)(props)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "emoji__list__items"
    }, emojiJSX), /*#__PURE__*/_react.default.createElement("div", {
      className: "emoji__category",
      style: (0, _style.emojiTabLsitStyle)(props)
    }, emojiCategoryJSX));
  };
  return renderItems();
};

// Specifies the default values for props:
exports.CometChatEmojiKeyboard = CometChatEmojiKeyboard;
CometChatEmojiKeyboard.defaultProps = {
  hideSearch: false,
  onClick: () => {},
  style: {
    width: "100%",
    height: "300px",
    border: "none",
    background: "rgb(255,255,255)",
    borderRadius: "8px",
    sectionHeaderFont: "500 12px Inter, sans-serif",
    sectionHeaderColor: "rgba(20,20,20,0.58)",
    categoryIconTint: "RGBA(20, 20, 20, 0.58)",
    selectedCategoryIconTint: "#39f"
  }
};
CometChatEmojiKeyboard.propTypes = {
  hideSearch: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object
};