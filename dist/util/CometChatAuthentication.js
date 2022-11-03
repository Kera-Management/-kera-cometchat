"use strict";

require("core-js/modules/es6.symbol.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatAuthentication = CometChatAuthentication;
var _react = _interopRequireDefault(require("react"));
var _CometChatContext = require("../../../util/CometChatContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function CometChatAuthentication(WrappedComponent) {
  var _class;
  return _class = class AuthenticatedComponent extends _react.default.Component {
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
  }, _defineProperty(_class, "contextType", _CometChatContext.CometChatContext), _class;
}