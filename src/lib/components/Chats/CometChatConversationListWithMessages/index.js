import React from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/react";
import { CometChat } from "@cometchat-pro/chat";

import { CometChatConversationList } from "..";
import { CometChatMessages } from "../../Messages";
import {
  CometChatIncomingCall,
  CometChatIncomingDirectCall,
} from "../../Calls";

import { CometChatContextProvider } from "../../../util/CometChatContext";
import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

class CometChatConversationListWithMessages extends React.Component {
  loggedInUser = null;

  constructor(props) {
    super(props);

    this.state = {
      tab: "conversations",
      sidebarview: false,
    };

    this.contextProviderRef = React.createRef();
    this.chatListRef = React.createRef();
  }

  componentDidMount() {
    if (
      this.props.chatWithUser.length === 0 &&
      this.props.chatWithGroup.length === 0
    ) {
      this.toggleSideBar();
    }
  }

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
          this.contextProviderRef.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.contextProviderRef.item.guid === group.guid &&
          options.user.uid === this.loggedInUser.uid
        ) {
          this.contextProviderRef.setItem({});
          this.contextProviderRef.setType("");
        }
        break;
      }
      case enums.GROUP_MEMBER_SCOPE_CHANGED: {
        if (
          this.contextProviderRef.type === CometChat.ACTION_TYPE.TYPE_GROUP &&
          this.contextProviderRef.item.guid === group.guid &&
          options.user.uid === this.loggedInUser.uid
        ) {
          const newObject = Object.assign({}, this.contextProviderRef.item, {
            scope: options["scope"],
          });
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
        _parent="conversations"
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
        <Flex
          className="cometchat cometchat--chats"
          dir={Translator.getDirection(this.props.lang)}
          height="100%"
          width="100%"
          boxSizing="border-box"
          position="relative"
          fontFamily={this.props.theme.fontFamily}
          border={`1px solid ${this.props.theme.borderColor.primary}`}
          sx={{
            "*": {
              boxSizing: "border-box",
              fontFamily: this.props.theme.fontFamily,
              "::-webkit-scrollbar": {
                width: "8px",
                height: "4px",
              },
              "::-webkit-scrollbar-track": {
                background: "#ffffff00"
              },
              "::-webkit-scrollbar-thumb": {
                background: "#ccc",
                "&:hover": {
                  background: "#aaa"
                }
              }
            }
          }}
        >
          <Box
            className="chats__sidebar"
            width={{ base: "100%", md: "280px" }}
            borderRight={`1px solid ${this.props.theme.borderColor.primary}`}
            height="100%"
            position="relative"
            display="flex"
            flexDirection="column"
            sx={{
              "> .chats": {
                height: "calc(100% - 5px)",
              },
              "@media (max-width: 768px)": {
                position: "absolute !important",
                left: this.state.sidebarview ? "0" : "-100%",
                top: "0",
                bottom: "0",
                width: "100% !important",
                zIndex: "2",
                backgroundColor: this.props.theme.backgroundColor.white,
                transition: "all .3s ease-out",
                boxShadow: this.state.sidebarview ? "rgba(0, 0, 0, .4) -30px 0 30px 30px" : "none"
              }
            }}
          >
            <CometChatConversationList
              ref={(el) => (this.chatListRef = el)}
              _parent="clwm"
              theme={this.props.theme}
              lang={this.props.lang}
              onItemClick={this.itemClicked}
              actionGenerated={this.actionHandler}
            />
          </Box>
          <Box
            className="chats__main"
            width={{ base: "100%", md: "calc(100% - 280px)" }}
            height="100%"
            order="2"
            display="flex"
            flexDirection="row"
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
        </Flex>
      </CometChatContextProvider>
    );
  }
}

// Specifies the default values for props:
CometChatConversationListWithMessages.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme,
  chatWithUser: "",
  chatWithGroup: "",
};

CometChatConversationListWithMessages.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object,
  chatWithUser: PropTypes.string,
  chatWithGroup: PropTypes.string,
};

export { CometChatConversationListWithMessages };
