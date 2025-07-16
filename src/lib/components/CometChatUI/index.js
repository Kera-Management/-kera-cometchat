import React from "react";
import { CometChat } from "@cometchat-pro/chat";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import Translator from "../../resources/localization/translator";
import { theme } from "../../resources/theme";
import { CometChatContextProvider } from "../../util/CometChatContext";
import * as enums from "../../util/enums.js";
import { CometChatIncomingCall, CometChatIncomingDirectCall } from "../Calls";
import { CometChatMessages } from "../Messages";

import { CometChatNavBar } from "./CometChatNavBar";

class CometChatUI extends React.Component {
  loggedInUser = null;

  constructor(props) {
    super(props);
    this.state = {
      sidebarview: false,
    };

    this.navBarRef = React.createRef();
    this.contextProviderRef = React.createRef();
  }

  componentDidMount() {
    if (
      this.props.chatWithUser.length === 0 &&
      this.props.chatWithGroup.length === 0
    ) {
      this.toggleSideBar();
    }
  }

  navBarAction = (action, type, item) => {
    switch (action) {
      case enums.ACTIONS["ITEM_CLICKED"]:
        this.itemClicked(item, type);
        break;
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleSideBar();
        break;
      default:
        break;
    }
  };

  itemClicked = (item, type) => {
    this.contextProviderRef.setTypeAndItem(type, item);
    this.toggleSideBar();
  };

  actionHandler = (action, item, count, ...otherProps) => {
    switch (action) {
      case enums.ACTIONS["TOGGLE_SIDEBAR"]:
        this.toggleSideBar();
        break;
      case enums.GROUP_MEMBER_SCOPE_CHANGED:
      case enums.GROUP_MEMBER_KICKED:
      case enums.GROUP_MEMBER_BANNED:
        this.groupUpdated(action, item, count, ...otherProps);
        break;
      default:
        break;
    }
  };

  toggleSideBar = () => {
    const sidebarview = this.state.sidebarview;
    this.setState({ sidebarview: !sidebarview });
  };

  /**
	 If the logged in user is banned, kicked or scope changed, update the chat window accordingly
	 */
  groupUpdated = (key, message, group, options) => {
    switch (key) {
      case enums.GROUP_MEMBER_BANNED:
      case enums.GROUP_MEMBER_KICKED: {
        if (
          this.contextProviderRef.state.type ===
            CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.contextProviderRef.state.item.guid === group.guid &&
          options.user.uid === this.loggedInUser.uid
        ) {
          this.contextProviderRef.setItem({});
          this.contextProviderRef.setType("");
        }
        break;
      }
      case enums.GROUP_MEMBER_SCOPE_CHANGED: {
        if (
          this.contextProviderRef.state.type ===
            CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.contextProviderRef.state.item.guid === group.guid &&
          options.user.uid === this.loggedInUser.uid
        ) {
          const newObject = Object.assign(
            {},
            this.contextProviderRef.state.item,
            { scope: options["scope"] }
          );
          this.contextProviderRef.setItem(newObject);
          this.contextProviderRef.setType(CometChat.ACTION_TYPE.TYPE_GROUP);
        }
        break;
      }
      default:
        break;
    }
  };

  render() {
    let messageScreen = (
      <CometChatMessages
        theme={this.props.theme}
        lang={this.props.lang}
        _parent="unified"
        actionGenerated={this.actionHandler}
      />
    );

    return (
      <CometChatContextProvider
        ref={(el) => (this.contextProviderRef = el)}
        user={this.props.chatWithUser}
        group={this.props.chatWithGroup}
        language={this.props.lang}
      >
        <Box
          className="cometchat cometchat--unified"
          dir={Translator.getDirection(this.props.lang)}
          display="flex"
          height="100%"
          width="100%"
          boxSizing="border-box"
          fontFamily={this.props.theme.fontFamily}
          border="1px solid #E2E8F0"
          position="relative"
          sx={{
            "*": {
              boxSizing: "border-box",
              fontFamily: this.props.theme.fontFamily,
              "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
              },
              "::-webkit-scrollbar-track": {
                background: "#ffffff00",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                  background: "#aaa",
                },
              },
            },
          }}
        >
          <Box
            className="unified__sidebar"
            backgroundColor="white"
            width="280px"
            borderRight="1px solid #E2E8F0"
            height="100%"
            position="relative"
            display="flex"
            flexDirection="column"
            sx={{
              "> .contacts, .chats, .groups, .userinfo": {
                height: "calc(100% - 64px)",
              },
              [`@media ${this.props.theme.breakPoints[0]}`]: {
                position: "absolute!important",
                left: this.state.sidebarview ? "0" : "-100%",
                top: "0",
                bottom: "0",
                width: "100%!important",
                zIndex: "2",
                backgroundColor: this.props.theme.backgroundColor.white,
                transition: "all .3s ease-out",
              },
            }}
          >
            <CometChatNavBar
              ref={(el) => (this.navBarRef = el)}
              theme={this.props.theme}
              actionGenerated={this.navBarAction}
            />
          </Box>
          <Box
            className="unified__main"
            width="calc(100% - 280px)"
            height="100%"
            order="2"
            backgroundColor="white"
            display="flex"
            flexDirection="row"
            sx={{
              [`@media ${this.props.theme.breakPoints[1]}, ${this.props.theme.breakPoints[2]}`]: {
                width: "100%",
              },
            }}
          >
            {messageScreen}
          </Box>
          <CometChatIncomingCall
            theme={this.props.theme}
            lang={this.props.lang}
            actionGenerated={this.actionHandler}
          />
          <CometChatIncomingDirectCall
            theme={this.props.theme}
            lang={this.props.lang}
            actionGenerated={this.actionHandler}
          />
        </Box>
      </CometChatContextProvider>
    );
  }
}

// Specifies the default values for props:
CometChatUI.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  chatWithUser: "",
  chatWithGroup: "",
};

CometChatUI.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  chatWithUser: PropTypes.string,
  chatWithGroup: PropTypes.string,
};

export { CometChatUI };
