"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatNavBar = void 0;
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.all-settled.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Users = require("../../Users");
var _Groups = require("../../Groups");
var _Chats = require("../../Chats");
var _UserProfile = require("../../UserProfile");
var enums = _interopRequireWildcard(require("../../../util/enums.js"));
var _CometChatContext = require("../../../util/CometChatContext");
var _translator = _interopRequireDefault(require("../../../resources/localization/translator"));
var _theme = require("../../../resources/theme");
var _tabs = _interopRequireDefault(require("../../../resources/tabs.json"));
var _style = require("./style");
var _chats = _interopRequireDefault(require("./resources/chats.svg"));
var _users = _interopRequireDefault(require("./resources/users.svg"));
var _groups = _interopRequireDefault(require("./resources/groups.svg"));
var _more = _interopRequireDefault(require("./resources/more.svg"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /** @jsxRuntime classic */ /** @jsx jsx */
class CometChatNavBar extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "tabListKeys", []);
    _defineProperty(this, "getFilteredTabs", () => {
      return new Promise(resolve => {
        const filteredTabs = [];
        const promises = [this.enableChats(), this.enableUsers(), this.enableGroups(), this.enableSettings()];
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
    _defineProperty(this, "enableGroups", () => {
      return new Promise(resolve => {
        this.context.FeatureRestriction.isGroupListEnabled().then(response => resolve(["SIDEBAR_GROUPS", response])).catch(error => resolve(["SIDEBAR_GROUPS", false]));
      });
    });
    _defineProperty(this, "enableSettings", () => {
      return new Promise(resolve => {
        this.context.FeatureRestriction.isUserSettingsEnabled().then(response => resolve(["SIDEBAR_MOREINFO", response])).catch(error => resolve(["SIDEBAR_MOREINFO", false]));
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
          return (0, _react2.jsx)(_Users.CometChatUserList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_CALLS":
          return null;
        case "SIDEBAR_CHATS":
          return (0, _react2.jsx)(_Chats.CometChatConversationList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_GROUPS":
          return (0, _react2.jsx)(_Groups.CometChatGroupList, {
            theme: this.props.theme,
            lang: this.context.language,
            _parent: "unified",
            actionGenerated: this.props.actionGenerated,
            onItemClick: (item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)
          });
        case "SIDEBAR_MOREINFO":
          return (0, _react2.jsx)(_UserProfile.CometChatUserProfile, {
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
            return (0, _react2.jsx)("div", {
              key: tab,
              css: (0, _style.itemStyle)(this.props),
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_CHATS")
            }, (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkStyle)(_chats.default, chatsTabActive, this.context),
              className: "item__link item__link__chats",
              title: _translator.default.translate("CHATS", this.context.language)
            }), (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkTextStyle)(chatsTabActive, this.context),
              className: "item__label"
            }, _translator.default.translate("CHATS", this.context.language)));
          case "SIDEBAR_USERS":
            return (0, _react2.jsx)("div", {
              key: tab,
              css: (0, _style.itemStyle)(this.props),
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_USERS")
            }, (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkStyle)(_users.default, userTabActive, this.context),
              className: "item__link item__link__contacts",
              title: _translator.default.translate("USERS", this.context.language)
            }), (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkTextStyle)(userTabActive, this.context),
              className: "item__label"
            }, _translator.default.translate("USERS", this.context.language)));
          case "SIDEBAR_GROUPS":
            return (0, _react2.jsx)("div", {
              key: tab,
              css: (0, _style.itemStyle)(this.props),
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_GROUPS")
            }, (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkStyle)(_groups.default, groupsTabActive, this.context),
              className: "item__link item__link__groups",
              title: _translator.default.translate("GROUPS", this.context.language)
            }), (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkTextStyle)(groupsTabActive, this.context),
              className: "item__label"
            }, _translator.default.translate("GROUPS", this.context.language)));
          case "SIDEBAR_MOREINFO":
            return (0, _react2.jsx)("div", {
              key: tab,
              css: (0, _style.itemStyle)(this.props),
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_MOREINFO")
            }, (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkStyle)(_more.default, moreTabActive, this.context),
              className: "item__link item__link__info",
              title: _translator.default.translate("MORE", this.context.language)
            }), (0, _react2.jsx)("div", {
              css: (0, _style.itemLinkTextStyle)(moreTabActive, this.context),
              className: "item__label"
            }, _translator.default.translate("MORE", this.context.language)));
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
    return (0, _react2.jsx)(_react.default.Fragment, null, this.getActiveTab(), (0, _react2.jsx)("div", {
      css: (0, _style.footerStyle)(),
      className: "sidebar__footer"
    }, (0, _react2.jsx)("div", {
      css: (0, _style.navbarStyle)(),
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