"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatNavBar = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.all-settled.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@chakra-ui/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Users = require("../../Users");
var _Groups = require("../../Groups");
var _Chats = require("../../Chats");
var _UserProfile = require("../../UserProfile");
var _phosphorReact = require("phosphor-react");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _tabs = _interopRequireDefault(require("../../../resources/tabs.json"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CometChatNavBar extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "tabListKeys", []);
    _defineProperty(this, "getFilteredTabs", () => {
      return new Promise(resolve => {
        const filteredTabs = [];
        const promises = [this.enableChats(), this.enableUsers()];
        Promise.allSettled(promises).then(results => {
          this.tabListKeys.forEach(eachTabKey => {
            results.forEach(result => {
              const tabKey = result.value[0];
              const tabEnabled = result.value[1];
              if (eachTabKey === tabKey && tabEnabled === true) {
                filteredTabs.push(eachTabKey);
              }
            });
          });
          resolve(filteredTabs);
        });
      });
    });
    _defineProperty(this, "enableChats", () => {
      return new Promise(resolve => {
        this.context.FeatureRestriction.isRecentChatListEnabled().then(response => resolve(["SIDEBAR_CHATS", response])).catch(error => resolve(["SIDEBAR_CHATS", false]));
      });
    });
    _defineProperty(this, "enableUsers", () => {
      return new Promise(resolve => {
        this.context.FeatureRestriction.isUserListEnabled().then(response => resolve(["SIDEBAR_USERS", response])).catch(error => resolve(["SIDEBAR_USERS", false]));
      });
    });
    _defineProperty(this, "tabChanged", tab => {
      this.setState({
        activeTab: tab
      });
    });
    _defineProperty(this, "getActiveTab", () => {
      switch (this.state.activeTab) {
        case "SIDEBAR_USERS":
          return /*#__PURE__*/_react.default.createElement(_Users.CometChatUserList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_CALLS":
          return null;
        case "SIDEBAR_CHATS":
          return /*#__PURE__*/_react.default.createElement(_Chats.CometChatConversationList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_GROUPS":
          return /*#__PURE__*/_react.default.createElement(_Groups.CometChatGroupList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_MOREINFO":
          return /*#__PURE__*/_react.default.createElement(_UserProfile.CometChatUserProfile, {
            theme: this.props.theme,
            lang: this.context.language,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        default:
          return null;
      }
    });
    _defineProperty(this, "getTabList", () => {
      const chatsTabActive = this.state.activeTab === "SIDEBAR_CHATS" ? true : false;
      const userTabActive = this.state.activeTab === "SIDEBAR_USERS" ? true : false;
      const groupsTabActive = this.state.activeTab === "SIDEBAR_GROUPS" ? true : false;
      const moreTabActive = this.state.activeTab === "SIDEBAR_MOREINFO" ? true : false;
      const tabList = [...this.state.tabList];
      return tabList.map(tab => {
        switch (tab) {
          case "SIDEBAR_CHATS":
            return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
              key: tab,
              p: "8px",
              cursor: "pointer",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              color: chatsTabActive ? "body" : "gray",
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_CHATS")
            }, /*#__PURE__*/_react.default.createElement(_phosphorReact.Chats, {
              size: 24,
              weight: "duotone"
            }), /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("CHATS", this.context.language)));
          case "SIDEBAR_USERS":
            return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
              key: tab,
              p: "8px",
              cursor: "pointer",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              color: userTabActive ? "body" : "gray",
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_USERS")
            }, /*#__PURE__*/_react.default.createElement(_phosphorReact.UsersThree, {
              size: 24,
              weight: "duotone"
            }), /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("USERS", this.context.language)));
          case "SIDEBAR_GROUPS":
            return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
              key: tab,
              p: "8px",
              cursor: "pointer",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              color: groupsTabActive ? "body" : "gray",
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_GROUPS")
            }, /*#__PURE__*/_react.default.createElement(_phosphorReact.Users, {
              size: 24,
              weight: "duotone"
            }), /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("GROUPS", this.context.language)));
          case "SIDEBAR_MOREINFO":
            return /*#__PURE__*/_react.default.createElement(_react2.Flex, {
              key: tab,
              p: "8px",
              cursor: "pointer",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
              color: moreTabActive ? "body" : "gray",
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_MOREINFO")
            }, /*#__PURE__*/_react.default.createElement(_phosphorReact.DotsThreeOutline, {
              size: 24,
              weight: "duotone"
            }), /*#__PURE__*/_react.default.createElement(_react2.Text, null, _translator.default.translate("MORE", this.context.language)));
          default:
            return null;
        }
      });
    });
    this.state = {
      activeTab: null,
      tabList: []
    };
  }
  componentDidMount() {
    let tabList = this.context.UIKitSettings.tabs;
    tabList.forEach(tabName => {
      for (const t in _tabs.default) {
        if (tabName === _tabs.default[t]) {
          this.tabListKeys.push(t);
        }
      }
    });
    this.getFilteredTabs().then(filteredTabs => {
      this.setState({
        tabList: filteredTabs,
        activeTab: filteredTabs[0]
      });
    });
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.getActiveTab(), /*#__PURE__*/_react.default.createElement(_react2.Box, {
      w: "100%",
      zIndex: "1",
      h: "64px",
      className: "sidebar__footer"
    }, /*#__PURE__*/_react.default.createElement(_react2.Flex, {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      w: "100%",
      h: "100%",
      className: "footer__navbar"
    }, this.getTabList())));
  }
}

// Specifies the default values for props:
exports.CometChatNavBar = CometChatNavBar;
_defineProperty(CometChatNavBar, "contextType", _CometChatContext.CometChatContext);
CometChatNavBar.defaultProps = {
  theme: _theme.theme
};
CometChatNavBar.propTypes = {
  theme: _propTypes.default.object
};