"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatEmojiKeyboard = void 0;
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.map.js");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@chakra-ui/react");
var _emojis = require("./emojis");
var _EmojiCategory = require("./EmojiCategory");
var _Emoji = require("./Emoji");
var _Shared = require("../../Shared");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    var _props$style4, _props$style5, _props$style6, _props$style7;
    let emojiJSX = null;
    let emojiCategoryJSX = [];
    let renderId = null;
    emojiJSX = _emojis.Emojis === null || _emojis.Emojis === void 0 ? void 0 : _emojis.Emojis.map((el, i) => {
      var _props$style, _props$style2, _Object$values;
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
      emojiCategoryJSX.push(/*#__PURE__*/_react.default.createElement(_react2.Box, {
        key: emojiCategory.id,
        className: "emoji__autoscroll"
      }, /*#__PURE__*/_react.default.createElement(_Shared.CometChatListItem, {
        key: emojiCategory.id,
        id: emojiCategory.id,
        iconURL: emojiCategory.symbol,
        style: {
          width: "24px",
          height: "24px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          iconTint: "#3399ff",
          iconBackground: "rgba(20, 20, 20, 0.58)"
        },
        onItemClick: autoScrollView.bind(void 0, emojiCategory.id)
      })));
      const title = /*#__PURE__*/_react.default.createElement(_react2.Text, {
        className: "emoji__category__title",
        textAlign: "left",
        paddingLeft: "16px",
        paddingTop: "8px",
        fontFamily: ((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.sectionHeaderFont) || "500 12px Inter, sans-serif",
        color: ((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.sectionHeaderColor) || "rgba(20,20,20,0.58)"
      }, emojiCategory.name);

      /**Emojis List */
      let emojiList = null;
      emojiList = Object === null || Object === void 0 || (_Object$values = Object.values(emojiCategory === null || emojiCategory === void 0 ? void 0 : emojiCategory.emojis)) === null || _Object$values === void 0 ? void 0 : _Object$values.map((emoji, i) => {
        var _Object$values2, _props$style3;
        let emojiId = Math.floor(Math.random() * ((Object === null || Object === void 0 || (_Object$values2 = Object.values) === null || _Object$values2 === void 0 ? void 0 : _Object$values2.length) - 0) + i);
        const emojiInstance = new _Emoji.CometChatEmoji({
          char: emoji.char,
          keywords: emoji.keywords
        });
        return /*#__PURE__*/_react.default.createElement(_Shared.CometChatListItem, {
          id: emojiId,
          key: emojiId,
          onItemClick: handleEvent.bind(void 0, emojiInstance),
          style: {
            padding: "10px",
            display: "flex",
            cursor: "pointer",
            borderRadius: "3px",
            alignItems: "center",
            justifyContent: "center",
            textFont: "700 22px Inter,sand-serif",
            background: (_props$style3 = props.style) === null || _props$style3 === void 0 ? void 0 : _props$style3.background
          },
          text: emojiInstance.char
        });
      });
      return /*#__PURE__*/_react.default.createElement(_react2.Box, {
        key: emojiCategory.id,
        id: emojiCategory.id // for auto scroll
        ,
        className: "emoji__category__wrapper",
        justifyContent: "center",
        alignItems: "center"
      }, title, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
        className: "emoji__list",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
      }, emojiList));
    });
    return /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "emoji__keyboard",
      padding: "0px",
      overflowY: "scroll",
      position: "relative",
      width: ((_props$style4 = props.style) === null || _props$style4 === void 0 ? void 0 : _props$style4.width) || "100%",
      height: ((_props$style5 = props.style) === null || _props$style5 === void 0 ? void 0 : _props$style5.height) || "300px",
      background: ((_props$style6 = props.style) === null || _props$style6 === void 0 ? void 0 : _props$style6.background) || "rgb(255,255,255)",
      boxShadow: "0px 0px 10px #ddd",
      zIndex: "9"
    }, /*#__PURE__*/_react.default.createElement(_react2.Box, {
      className: "emoji__list__items"
    }, emojiJSX), /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      className: "emoji__category",
      width: "100%",
      zIndex: "9",
      display: "flex",
      flexWrap: "wrap",
      padding: "15px 8px",
      position: "sticky",
      bottom: "0px",
      alignItems: "center",
      justifyContent: "space-around",
      background: ((_props$style7 = props.style) === null || _props$style7 === void 0 ? void 0 : _props$style7.background) || "rgb(255,255,255)"
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