"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GroupDetailContext = /*#__PURE__*/_react.default.createContext({
  memberlist: [],
  bannedmemberlist: [],
  administratorslist: [],
  moderatorslist: []
});
var _default = exports.default = GroupDetailContext;