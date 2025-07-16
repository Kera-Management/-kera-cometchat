import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatUserList } from "../../Users";
import { CometChatGroupList } from "../../Groups";
import { CometChatConversationList } from "../../Chats";
import { CometChatUserProfile } from "../../UserProfile";
import { Chats, UsersThree, Users, DotsThreeOutline } from "phosphor-react";

import * as enums from "../../../util/enums.js";
import { CometChatContext } from "../../../util/CometChatContext";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";
import tabs from "../../../resources/tabs.json";


export class CometChatNavBar extends React.Component {
  static contextType = CometChatContext;

  tabListKeys = [];
  constructor(props) {
    super(props);

    this.state = {
      activeTab: null,
      tabList: [],
    };
  }

  componentDidMount() {
    let tabList = this.context.UIKitSettings.tabs;
    tabList.forEach((tabName) => {
      for (const t in tabs) {
        if (tabName === tabs[t]) {
          this.tabListKeys.push(t);
        }
      }
    });

    this.getFilteredTabs().then((filteredTabs) => {
      this.setState({ tabList: filteredTabs, activeTab: filteredTabs[0] });
    });
  }

  getFilteredTabs = () => {
    return new Promise((resolve) => {
      const filteredTabs = [];
      const promises = [this.enableChats(), this.enableUsers()];
      Promise.allSettled(promises).then((results) => {
        this.tabListKeys.forEach((eachTabKey) => {
          results.forEach((result) => {
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
  };

  enableChats = () => {
    return new Promise((resolve) => {
      this.context.FeatureRestriction.isRecentChatListEnabled()
        .then((response) => resolve(["SIDEBAR_CHATS", response]))
        .catch((error) => resolve(["SIDEBAR_CHATS", false]));
    });
  };

  enableUsers = () => {
    return new Promise((resolve) => {
      this.context.FeatureRestriction.isUserListEnabled()
        .then((response) => resolve(["SIDEBAR_USERS", response]))
        .catch((error) => resolve(["SIDEBAR_USERS", false]));
    });
  };

  tabChanged = (tab) => {
    this.setState({ activeTab: tab });
  };

  getActiveTab = () => {
    switch (this.state.activeTab) {
      case "SIDEBAR_USERS":
        return (
          <CometChatUserList
            theme={this.props.theme}
            lang={this.context.language}
            _parent="unified"
            actionGenerated={this.props.actionGenerated}
            onItemClick={(item, type) =>
              this.props.actionGenerated(
                enums.ACTIONS["ITEM_CLICKED"],
                type,
                item
              )
            }
          />
        );
      case "SIDEBAR_CALLS":
        return null;
      case "SIDEBAR_CHATS":
        return (
          <CometChatConversationList
            theme={this.props.theme}
            lang={this.context.language}
            _parent="unified"
            actionGenerated={this.props.actionGenerated}
            onItemClick={(item, type) =>
              this.props.actionGenerated(
                enums.ACTIONS["ITEM_CLICKED"],
                type,
                item
              )
            }
          />
        );
      case "SIDEBAR_GROUPS":
        return (
          <CometChatGroupList
            theme={this.props.theme}
            lang={this.context.language}
            _parent="unified"
            actionGenerated={this.props.actionGenerated}
            onItemClick={(item, type) =>
              this.props.actionGenerated(
                enums.ACTIONS["ITEM_CLICKED"],
                type,
                item
              )
            }
          />
        );
      case "SIDEBAR_MOREINFO":
        return (
          <CometChatUserProfile
            theme={this.props.theme}
            lang={this.context.language}
            onItemClick={(item, type) =>
              this.props.actionGenerated(
                enums.ACTIONS["ITEM_CLICKED"],
                type,
                item
              )
            }
          />
        );
      default:
        return null;
    }
  };

  getTabList = () => {
    const chatsTabActive =
      this.state.activeTab === "SIDEBAR_CHATS" ? true : false;
    const userTabActive =
      this.state.activeTab === "SIDEBAR_USERS" ? true : false;
    const groupsTabActive =
      this.state.activeTab === "SIDEBAR_GROUPS" ? true : false;
    const moreTabActive =
      this.state.activeTab === "SIDEBAR_MOREINFO" ? true : false;

    const tabList = [...this.state.tabList];

    return tabList.map((tab) => {
      switch (tab) {
        case "SIDEBAR_CHATS":
          return (
            <Flex
              key={tab}
              p="8px"
              cursor="pointer"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              className="navbar__item"
              onClick={() => this.tabChanged("SIDEBAR_CHATS")}
            >
              <Chats
                color={chatsTabActive ? "#086972" : "gray"}
                size={24}
                weight="duotone"
              />

              <Box color={chatsTabActive ? "#086972" : "gray"}>
                {Translator.translate("CHATS", this.context.language)}
              </Box>
            </Flex>
          );
        case "SIDEBAR_USERS":
          return (
            <Flex
              key={tab}
              p="8px"
              cursor="pointer"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              className="navbar__item"
              onClick={() => this.tabChanged("SIDEBAR_USERS")}
            >
              <UsersThree
                color={userTabActive ? "#086972" : "gray"}
                size={24}
                weight="duotone"
              />

              <Box color={userTabActive ? "#086972" : "gray"}>
                {Translator.translate("USERS", this.context.language)}
              </Box>
            </Flex>
          );
        case "SIDEBAR_GROUPS":
          return (
            <Flex
              key={tab}
              p="8px"
              cursor="pointer"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              className="navbar__item"
              onClick={() => this.tabChanged("SIDEBAR_GROUPS")}
            >
              <Users
                color={groupsTabActive ? "#086972" : "gray"}
                size={24}
                weight="duotone"
              />

              <Box color={groupsTabActive ? "#086972" : "gray"}>
                {Translator.translate("GROUPS", this.context.language)}
              </Box>
            </Flex>
          );
        case "SIDEBAR_MOREINFO":
          return (
            <Flex
              key={tab}
              p="8px"
              cursor="pointer"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="12px"
              color={this.props.theme.color.helpText}
              className="navbar__item"
              onClick={() => this.tabChanged("SIDEBAR_MOREINFO")}
            >
              <DotsThreeOutline
                color={moreTabActive ? "#086972" : "gray"}
                size={24}
                weight="duotone"
              />

              <Box color={moreTabActive ? "#086972" : "gray"}>
                {Translator.translate("MORE", this.context.language)}
              </Box>
            </Flex>
          );

        default:
          return null;
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.getActiveTab()}
        <Box
          w="100%"
          zIndex="1"
          h="64px"
          className="sidebar__footer"
        >
          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            w="100%"
            h="100%"
            className="footer__navbar"
          >
            {this.getTabList()}
          </Flex>
        </Box>
      </React.Fragment>
    );
  }
}

// Specifies the default values for props:
CometChatNavBar.defaultProps = {
  theme: theme,
};

CometChatNavBar.propTypes = {
  theme: PropTypes.object,
};
