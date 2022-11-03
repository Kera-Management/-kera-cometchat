"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CometChatNavBar = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.all-settled.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@emotion/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Users = require("../../Users");
var _react3 = require("@chakra-ui/react");
var _Groups = require("../../Groups");
var _Chats = require("../../Chats");
var _UserProfile = require("../../UserProfile");
var _phosphorReact = require("phosphor-react");
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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
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
            }, (0, _react2.jsx)(_phosphorReact.Chats, {
              color: chatsTabActive ? "#086972" : "gray",
              size: 24,
              weight: "duotone"
            }), (0, _react2.jsx)(_react3.Box, {
              color: chatsTabActive ? "#086972" : "gray"
            }, _translator.default.translate("CHATS", this.context.language)));
          case "SIDEBAR_USERS":
            return (0, _react2.jsx)("div", {
              key: tab,
              css: (0, _style.itemStyle)(this.props),
              className: "navbar__item",
              onClick: () => this.tabChanged("SIDEBAR_USERS")
            }, (0, _react2.jsx)(_phosphorReact.UsersThree, {
              color: userTabActive ? "#086972" : "gray",
              size: 24,
              weight: "duotone"
            }), (0, _react2.jsx)(_react3.Box, {
              color: userTabActive ? "#086972" : "gray"
            }, _translator.default.translate("USERS", this.context.language)));
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