"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.filter.js");
require("core-js/modules/esnext.iterator.for-each.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAuthentication = CometChatAuthentication;
var _react = _interopRequireDefault(require("react"));
var _CometChatContext = require("../../../util/CometChatContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
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