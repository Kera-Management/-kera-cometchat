"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAuthentication = CometChatAuthentication;
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireDefault(require("react"));
var _CometChatContext = require("../../../util/CometChatContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function CometChatAuthentication(WrappedComponent) {
  var _AuthenticatedComponent;
  return _AuthenticatedComponent = class AuthenticatedComponent extends _react.default.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        loggedInUser: null
      };
    }
    componentDidMount() {
      this.context.getLoggedinUser().then(user => {
        this.setState({
          loggedInUser: _objectSpread({}, user)
        });
      });
    }
    /**
     * Check if the user is authenticated, this.props.isAuthenticated
     * has to be set from your application logic (or use react-redux to retrieve it from global state).
     */
    isAuthenticated() {
      return this.props.isAuthenticated;
    }

    /**
     * Render
     */
    render() {
      return /*#__PURE__*/_react.default.createElement("div", null, this.state.loggedInUser === null ? null : /*#__PURE__*/_react.default.createElement(WrappedComponent, _extends({}, this.props, {
        loggedInUser: this.state.loggedInUser
      })));
    }
  }, _defineProperty(_AuthenticatedComponent, "contextType", _CometChatContext.CometChatContext), _AuthenticatedComponent;
}