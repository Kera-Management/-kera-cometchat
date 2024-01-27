"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _testUtils = require("react-dom/test-utils");
require("jest-canvas-mock");
var _CometChatContext = require("../../../util/CometChatContext");
var _ = require("./");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
describe("CometChatGroupListItem", () => {
  let container = null;
  it("renders without crashing", () => {
    container = document.createElement("div");
    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_CometChatContext.CometChatContextProvider, {
      group: ""
    }, /*#__PURE__*/_react.default.createElement(_.CometChatGroupListItem, null)), container);
  });
});